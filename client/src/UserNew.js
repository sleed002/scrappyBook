import React from 'react';
import axios from 'axios';

const avatars = [
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/64623a33850498.56ba69ac2a6f7.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/f9fa8a33850498.56ba69ac2cc3a.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/2c659933850498.56ba69ac2e080.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/bb3a8833850498.56ba69ac33f26.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/bf6e4a33850498.56ba69ac3064f.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/363e3e33850498.56ba69ac3183c.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/e70b1333850498.56ba69ac32ae3.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/c7906d33850498.56ba69ac353e1.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/fd69a733850498.56ba69ac2f221.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
]

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
      <div className="UserAdd">
        <form onSubmit={this.handleSubmit}>
          New User:
          <br/>
          {/* account for non-unique username entry? */}
          <input value={username} name="username" onChange={this.handleChange} placeholder="Username*" />
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
          <p>*Required Field</p>
        </form>
        {/* <img src={avatars[0]} width="100px"/> */}
        {this.renderAvatars(avatars)}
      </div>
    )
  }

  renderAvatars(avatars){
    console.log("in renderAvatars");
    return (
      <ul>
        {avatars.map(avatar => this.renderAvatar(avatar))}
      </ul>
    );
  }

  renderAvatar(avatar){
    console.log(avatar)
      return(
        <img src={avatar} alt="avatar" width="100px" />
      )
  }

  handleChange(e) {
    const {value, name} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    // debugger;
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
