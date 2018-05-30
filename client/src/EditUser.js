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

class EditUser extends React.Component {
  constructor (props) {
    super(props);
    this.state = {username:"", user_nickname:"", user_bio:"", user_fave_color: "", user_avatar:""}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

render () {
const {username, user_nickname, user_bio, user_fave_color, user_avatar} = this.state;


  return (
    <div className="UserEdit">
      <form onSubmit={this.handleSubmit}>
        <h3>Edit a User</h3>
        <br/>
        Username:*<br/>
        <input value={username}
               name="username"
               onChange={this.handleChange}
               placeholder="username" />
        <br/>
        Nickname:<br/>
        <input value={user_nickname}
               name="user_nickname"
               onChange={this.handleChange}
               placeholder="nickname" />
        <br/>
        Bio:<br/>
        <textarea value={user_bio}
                  name="user_bio"
                  onChange={this.handleChange}
                  placeholder="tell us about yourself!" />
        <br/>
        Favorite Color:<br/>
        <input value={user_fave_color}
               name="user_fave_color"
               onChange={this.handleChange}
               placeholder="favorite color" />
        <br/>
        Choose Your Avatar:<br/>
        {this.renderAvatars(avatars)}
        <br/>
        <input type="radio"
               name="user_avatar"
               value={user_avatar} />
        Or enter in your own avatar URL:<br/>
        <input size="100"
               type="text"
               value={user_avatar}
               name="user_avatar"
               onChange={this.handleChange}
               placeholder="avatar image url" />
        <br/>
        <input type="submit"
               value="Submit User!" />
        <p>*Required Field</p>
      </form>
    </div>
  );
}

renderAvatars(avatars){
  console.log("in renderAvatars");
  return (
    <ul>
      {/* {avatars.map(avatar => this.renderAvatar(avatar))} */}
      {avatars.map((avatar,i) => {
        return (this.renderAvatar(avatar, i))
      })}
    </ul>
  );
}

renderAvatar(avatar, i){
  console.log(avatar);
  console.log(i);
    return(
      // https://stackoverflow.com/a/21668071
      <span className={"avatar-"+i}>
        <input type="radio"
               name="user_avatar"
               value={avatar}
               onChange={this.handleChange}/>
        <img src={avatar}
             alt={"avatar-"+i}
             width="75px" />
      </span>
    )
}

handleChange (e) {
  const {value, name} = e.target;
  this.setState({
    [name]: value
  });
}

handleSubmit(e) {
  const {username, user_nickname, user_bio, user_fave_color, user_avatar} = this.state;
  const { id } = this.props.match.params;

  e.preventDefault();

  axios.put(`/api/users/${id}`, {username, user_nickname, user_bio, user_fave_color, user_avatar})
  .then(res => {
    this.props.history.push(`/users/${id}`);
  }).catch(e => {
    console.warn(e);
    alert("Trouble with updating user! Please enter a unique username!")
  })
}



componentDidMount () {
  const { id } = this.props.match.params;
  axios.get(`/api/users/${id}`).then(res => {
    const { username, user_nickname, user_bio, user_fave_color, user_avatar } = res.data;
    this.setState({ username, user_nickname, user_bio, user_fave_color, user_avatar });
   });
 }
}

export default EditUser;
