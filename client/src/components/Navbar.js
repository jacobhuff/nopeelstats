import React from 'react'
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="games">
                <div className="game"><Link to='/'>Overwatch</Link></div>
                <div className="game"><Link to='/Apex'>Apex</Link></div>
                <div className="game"><Link>Valorant</Link></div>
                <div className="game"><Link>TFT</Link></div>
            </div>
        </div>
    )
}

export default Navbar
