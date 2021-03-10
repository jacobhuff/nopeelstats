const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const ostat = require('overwatch-stat');
const Stats = require('./models/stats.model');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('client/build'));

const uri = process.env.ATLAS_URI;

// DB Connection
getConnection = async () => {
  try {
    await mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => {
      console.log('DB Connected')
    })
    .catch(err => console.log(err))
  } catch(err) {
    console.log('DB Error: ' + err);
  }
}

getConnection();

/* GET STATS */
const gamers = ['GroutNasty#1617', 'NekoNekoNyan#1907', 'HaKobo#11997', 'cottonballer#11958', 'realboty#1665', 'TruBuddhaTV#1146', 'JohnV1#1190'];
// const gamersToAdd = ['OGmrAzimuth#1952'];
// function update() {
//   setInterval(async () => {
//     await getStats();
//     console.log("Updated Stats");
//   }, 86400000);
// }
// update();
/* GET STATS */



/* UPDATE STATS TO DATABASE */
async function getStats() {
  for (const gamer of gamers) {
    await ostat.getStat(gamer, 'us', 'pc').then(async items => {
      let heroStats = items.competitiveStats.careerStats;

      await ostat.getProfile(gamer,'us', 'pc').then(r => {
        var ratings;
        var getRatings = new Promise((resolve, reject) => {
          console.log(r.ratings);
          if (r.ratings === null) {
            ratings = 'NOT_PLACED';
          }
          else if (r.ratings.length === null) {
            ratings = 'NOT_PLACED';
          }
          else if (r.ratings.length === 0) {
            ratings = 'NOT_PLACED';
          }
          else if (r.ratings === undefined) {
            ratings = 'UNDEFINED'
          }
          else {
            ratings = [];
            for (let i = 0; i < r.ratings.length; i++) {
              let currRating = {};
              currRating.role = r.ratings[i].role;
              currRating.sr = r.ratings[i].level;
              ratings.push(currRating);
            }
            heroStats.ratings = ratings;
          }
          resolve();
        });

      });

      var query = { username: gamer };
      var update = { username: gamer, stats: heroStats };
      var options = { upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false };
      
      Stats.findOneAndUpdate(query, update, options, (err) => {
        if (err) console.log(err);
      })
    })
  }
}
/* UPDATE STATS TO DATABASE */

/* ADD NEW PLAYER */
// getStats();
/* ADD NEW PLAYER */

app.get('/retrievestats', async (req, res) => {

  var stats;
  var dataToReturn = [];

  await Stats.find({}, (err, data) => {
    stats = data;
  })

  var sortData = new Promise((resolve, reject) => {
    stats.forEach((user, index, array) => {
      // create user object
      let currUser = {};
      currUser.username = user.username;
      currUser.ratings = user.stats.ratings;

      // get hero stats
      let heroStats = user.stats;
      var getHeroData = new Promise((resolve, reject) => {
        let currHeroes = [];
        for (var hero in heroStats) {
          let currHero = {};
          if (hero !== 'allHeroes' && heroStats[hero].game !== undefined) {
            if (heroStats[hero].game.gamesPlayed >= 10) {
              currHero.hero = hero;
              currHero.wins = heroStats[hero].game.gamesWon;
              currHero.losses = heroStats[hero].game.gamesLost;
              if (hero !== 'allHeroes' && heroStats[hero].average !== undefined) {
                currHero.objectiveTime = heroStats[hero].average.objectiveTimeAvgPer10Min;
              }
              if (hero !== 'allHeroes' && heroStats[hero].combat !== undefined) {
                currHero.eliminations = heroStats[hero].combat.eliminations;
                currHero.deaths = heroStats[hero].combat.deaths;
              }
              currHeroes.push(currHero);
            }
          }
        }
        currUser.heroes = currHeroes;
        resolve();
      });
      dataToReturn.push(currUser);
      getHeroData.then(() => {

      });
      if (index === array.length - 1) resolve();
    });
  });

  sortData.then(() => {

  });

  res.send(dataToReturn);

})

/* Production */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
  
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});