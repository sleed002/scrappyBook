import React from 'react';
import { Link, NavLink } from "react-router-dom";
import axios from 'axios';
import { Button } from 'reactstrap';


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
        <NavLink className="NewUsersLink" exact to="/users/new"><Button className="btn btn-link">Create New User</Button></NavLink>
      </div>
    </div>
    );
  }

  renderUserLink (user) {
    return (
      <li key={user.user_id} className="UserName">
        <div className="row justify-content-md-center">
          <div className="col-sm-4">
            <div className="card-group mb-3">
              <img src={user.user_avatar} width="auto" height="116px" alt="User avatar" />
              <div className="card">
                <div class="card-header"><Link to={`/users/${user.user_id}`}>{user.username}</Link></div>
                  <card-body>
                    <p>{user.user_bio}</p>
                  </card-body>
                </div>
              </div>
            </div>
          </div>
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
