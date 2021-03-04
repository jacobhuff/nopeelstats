const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const statsSchema = new Schema({
    username: {
        type: String
    },
    stats: {
        type: Object
    }
})

const Stats = mongoose.model('Stats', statsSchema)
module.exports = Stats