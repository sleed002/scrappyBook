import React from 'react';
import { Link, NavLink } from "react-router-dom";
import axios from 'axios';
import { Button, Container, Row, Col } from 'reactstrap';


class Users extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      users: null
    };
  }

  render () {
    const { users } = this.state;
    if (!users) {
      return <div>loading...</div>;
    }

    return (
      <div className="App">
      <div className="Users">
        <h3>All Users</h3>
        <ul>
          {users.map(user => this.renderUserLink(user))}
        </ul>
        <NavLink className="NewUsersLink" exact to="/users/new"><Button color="btn btn-light">Create New User</Button></NavLink>
      </div>
    </div>
    );
  }

  renderUserLink (user) {
    return (
      <li key={user.user_id} className="UserName">
        <Link to={`/users/${user.user_id}`}>{user.username}</Link>
      </li>
    );
  }

  componentDidMount () {
    axios.get('api/users').then(res => {
      this.setState({users: res.data})
    });
  }
}

export default Users;
