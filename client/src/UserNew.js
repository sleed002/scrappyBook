import React from 'react';
import axios from 'axios';

class UserNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {username:"", user_nickname:"", user_bio:"", user_fave_color: "", user_avatar:""}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render(){
    const {username, user_nickname, user_bio, user_fave_color, user_avatar} = this.state;
    return(
      // <div>Hi</div>
      <form onSubmit={this.handleSubmit}>
        New User:
        <br/>
        {/* account for non-unique username entry? */}
        <input value={username} name="username" onChange={this.handleChange} placeholder="Username" />
        <br/>
        <input value={user_nickname} name="user_nickname" onChange={this.handleChange} placeholder="Nickname" />
        <br/>
        <textarea value={user_bio} name="user_bio" onChange={this.handleChange} placeholder="Tell Us About Yourself!" />
        <br/>
        <input value={user_fave_color} name="user_fave_color" onChange={this.handleChange} placeholder="Favorite Color" />
        <br/>
        <input value={user_avatar} name="user_avatar" onChange={this.handleChange} placeholder="Avatar URL" />
        <br/>
        <input type="submit" value="Submit User!" />
      </form>
    )
  }

  handleChange(e) {
    const {value, name} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    debugger;
    // const {userid} = this.props.match.params;
    const {username, user_nickname, user_bio, user_fave_color, user_avatar} = this.state;

    e.preventDefault();

    axios.post(`/api/users/`, {username, user_nickname, user_bio, user_fave_color, user_avatar})
    .then(res => {
      this.props.history.push(`/users/`);
    }).catch(e => {
      console.warn(e);
      alert("Trouble with posting new user!")
    })
  }


}

export default UserNew;
