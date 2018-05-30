import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home';
import UserNew from './UserNew';
import Users from './Users';
import User from './User';
import postShow from './post';
import PostNew from './PostNew';
import EditUser from './EditUser.js';
import { BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';
// SOURCE: https://reactstrap.github.io/
import { Button, Container, Row, Col } from 'reactstrap';

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
          <Row>
            <Col>
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/users' component={Users}/>
                <Route exact path="/users/new" component={UserNew} />
                <Route exact path='/users/:id/edit' component={EditUser}/>
                <Route exact path='/users/:id' component={User}/>
                <Route exact path="/users/:userid/posts/new" component={PostNew} />
                <Route exact path='/users/:user_id/posts/:post_id' component={postShow}/>
              </Switch>
            </Col>
          </Row>
          <footer>Created by FlexFroggies</footer>
        </div>
      </Router>
    );
  }
}
//
// {
//   <NavLink className="HomeLink" exact to="/users">Home</NavLink>
//   <NavLink className="UsersLink" exact to="/users/:id">Users</NavLink>
//   <NavLink exact to="/users/:id/posts">Chat App</NavLink>
//   <NavLink exact to="/users/:id/posts/:postid">Chat App</NavLink>
//   <NavLink exact to="/users/:id/posts/:postid/photos/photoid">Chat App</NavLink>
//
//   }
//
export default App;
