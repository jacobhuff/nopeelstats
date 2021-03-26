import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import './styles/User.css';
import './styles/Navbar.css';

// Page Imports
import Home from './pages/Home'
import Apex from './pages/Apex'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path='/' component={Home}/>
          <Route path='/Apex' component={Apex}/>
        </Router>
      </div>
    );
  }
}
