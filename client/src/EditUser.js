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
  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/fd69a733850498.56ba69ac2f221.png"
]

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      user_nickname: "",
      user_bio: "",
      user_fave_color: "",
      user_avatar: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const {username, user_nickname, user_bio, user_fave_color, user_avatar} = this.state;

    return (<div className="App">
      <h3>Edit a User</h3>

      <div className="UserEdit">
        <form onSubmit={this.handleSubmit}>
          <br/>
          <div className="userEditForm">
            <div className="form-group col-md-4">
              Username:*<br/>
              <input value={username} className="form-control" name="username" onChange={this.handleChange} placeholder="username"/>
            </div>
            <br/>
            <div className="form-group col-md-4">
              Nickname:<br/>
              <input value={user_nickname} className="form-control" name="user_nickname" onChange={this.handleChange} placeholder="nickname"/>
            </div>
            <br/>
            <div className="form-group col-md-4">
              Bio:<br/>
              <textarea value={user_bio} className="form-control" name="user_bio" onChange={this.handleChange} placeholder="tell us about yourself!"/>
            </div>
            <br/>
            <div className="form-group col-md-4">
              Favorite Color:<br/>
              <input value={user_fave_color} className="form-control" name="user_fave_color" onChange={this.handleChange} placeholder="favorite color"/>
              <br/><br/>
            </div>

            <div className="form-group col-md-4" id="avatarForm">
              Choose Your Avatar:
              <div className="chooseAvatarText">
                {this.renderAvatars(avatars)}</div>
              <br/></div>

            <br/>

            <div className="form-group col-md-4">
              <input type="radio" name="user_avatar" value={user_avatar}/>
              <span className="whiteText">
                Or enter in your own avatar URL:</span>
            </div><br/>

            <div className="form-group col-md-4">
              <input size="100" type="text" value={user_avatar} className="form-control" name="user_avatar" onChange={this.handleChange} placeholder="avatar image url"/>
              <br/></div>

            <div className="form-group col-sm-2">
              <input type="submit" value="Submit User!" className="form-control"/>
              <p>*Required Field</p>
            </div>
          </div>
        </form>
      </div>
    </div>);
  }

  renderAvatars(avatars) {
    return (<ul>
      {
        avatars.map((avatar, i) => {
          return (this.renderAvatar(avatar, i))
        })
      }
    </ul>);
  }

  renderAvatar(avatar, i) {
    return (
    // https://stackoverflow.com/a/21668071

    <span className={"avatar-" + i} key={"avatar-" + i}>
      <input type="radio" name="user_avatar" value={avatar} onChange={this.handleChange}/>
      <img src={avatar} alt={"avatar-" + i} width="65px"/>
    </span>)
  }

  handleChange(e) {
    const {value, name} = e.target;
    this.setState({[name]: value});
  }

  handleSubmit(e) {
    const {username, user_nickname, user_bio, user_fave_color, user_avatar} = this.state;
    const {id} = this.props.match.params;

    e.preventDefault();

    axios.put(`/api/users/${id}`, {username, user_nickname, user_bio, user_fave_color, user_avatar}).then(res => {
      this.props.history.push(`/users/${id}`);
    }).catch(e => {
      console.warn(e);
      alert("Trouble with updating user! Please enter a unique username!")
    })
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    axios.get(`/api/users/${id}`).then(res => {
      const {username, user_nickname, user_bio, user_fave_color, user_avatar} = res.data;
      this.setState({username, user_nickname, user_bio, user_fave_color, user_avatar});
    });
  }
}

export default EditUser;
