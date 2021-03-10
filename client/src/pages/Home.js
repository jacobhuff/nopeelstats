import React, { Component } from 'react'
import User from '../components/User';
import axios from 'axios'
import {BACKEND_URL} from '../config';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
          stats: []
        };
      }

    componentDidMount() {
        axios.get(BACKEND_URL)
        .then((res) => {
            // console.log(res.data);
            this.setState({ stats: res.data });
        })
    }

    render() {
        return (
            // <div>
            //     Updating DB
            // </div>
            <div className="container">
                {
                    this.state.stats.map((user) => (
                        (user.heroes.length === 0)
                        ? (<div></div>)
                        : (<User key={user.username} user={user}/>)
                    ))
                }
                <div></div>
            </div>
        )
    }
}

export default Home
