import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';
// SOURCE: https://reactstrap.github.io/
import { Button } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-intro" >
            <div className="App-title"></div>
            Scr<span className="appcolors">app</span> Book<br />
            <Button color="Secondary" onClick={this.handleSubmit}>
              All Users
            </Button>
          </div>
        </div>
      </Router>
    );
  }
}



export default Home;
