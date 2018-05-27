import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';
// SOURCE: https://reactstrap.github.io/
import { Button } from 'reactstrap';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">Collect Memories, Save Fun</header>

          <div className="NavigationBar">
            <NavLink className="HomeLink" exact to="/">Home</NavLink>
            <NavLink className="UsersLink" exact to="/users">Users</NavLink>
          </div>
          <p className="App-intro">
            <h1 className="App-title"></h1>
            Scr<span class="appcolors">app</span> Book<br />
            <Button color="Secondary" onClick={this.handleSubmit}>
              All Users
            </Button>
          </p>
          <footer>Created by FlexFroggies</footer>
        </div>
      </Router>
    );
  }
}
{/*
  <NavLink className="HomeLink" exact to="/users">Home</NavLink>
  <NavLink className="UsersLink" exact to="/users/:id">Users</NavLink>
  <NavLink exact to="/users/:id/posts">Chat App</NavLink>
  <NavLink exact to="/users/:id/posts/:postid">Chat App</NavLink>
  <NavLink exact to="/users/:id/posts/:postid/photos/photoid">Chat App</NavLink>

  */}
export default App;
