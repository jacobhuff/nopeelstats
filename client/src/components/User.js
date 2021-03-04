import React from 'react'

function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../images/heroIcons', false, /\.png/));

const User = ({user}) => {
    return (
        <div className='user'>
            <div className="user-info">
                <div className="user-name"><div>{user.username}</div></div>
                <div className="user-ratings">
                    {user.ratings.map((rating) => (
                        <div className="user-rating">
                            <span id="role-span">{rating.role[0].toUpperCase() + rating.role.substring(1)}</span>: {rating.sr} SR
                        </div>
                    ))}
                </div>
            </div>
            <div className="user-stats">
                    {user.heroes.map((hero) => (
                        <div className="hero">
                            <div className="hero-info">
                                <div className="hero-name">{hero.hero[0].toUpperCase() + hero.hero.substring(1)}</div>
                                <div className="hero-portrait">
                                    <img src={images[hero.hero + '.png'].default} alt=""/>
                                </div>
                            </div>
                            
                            <div className="hero-stats">
                                <div className="hero-stat">
                                    <div className="hero-stat-title">Record</div>
                                    <div className="hero-specific-stat">
                                        <span id="wins">{hero.wins} </span>
                                        -  
                                        <span id="losses"> {hero.losses}</span>
                                     </div>
                                </div>
                                <div className="hero-stat">
                                    <div className="hero-stat-title">K/D Ratio</div>
                                    <div className="hero-specific-stat">
                                        {(hero.eliminations / hero.deaths).toFixed(1)}
                                     </div>
                                </div>
                                <div className="hero-stat">
                                    <div className="hero-stat-title">Obj. Time / 10 min</div>
                                    <div className="hero-specific-stat">
                                        {hero.objectiveTime}
                                     </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div> 
        </div>
    )
}

export default User
