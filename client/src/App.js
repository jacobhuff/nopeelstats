import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import './styles/User.css';

// Page Imports
import Home from './pages/Home'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path='/' component={Home}/>
        </Router>
      </div>
    );
  }
}
