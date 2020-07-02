import React from 'react';
import axios from 'axios';

class PostNew extends React.Component {
  constructor(props) {
    super(props);
    //Getting current time & date: https://stackoverflow.com/a/14638063
    var d = new Date();
    this.state = {
      post_title: "",
      post_text: "",
      post_time_date: d.toLocaleString()
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const {post_title, post_text, post_time_date} = this.state;
    return (<div className="App">

      <form onSubmit={this.handleSubmit}>
        <h3>Create a New Post</h3>


        <div className="AddPost">

          <div className="userEditForm">
          <div className="form-group col-md-2"><p>Post Title:</p>
            <input value={post_title} className="form-control" onChange={this.handleChange} name="post_title" placeholder="Your post title!"/></div>

          <div className="form-group col-md-6"><p>Post Text:</p>
            <textarea value={post_text} className="form-control" name="post_text" onChange={this.handleChange} placeholder="What did you do today?"/></div>

          <div className="form-group col-md-2"><p>Date:</p>
            <input value={post_time_date} className="form-control" onChange={this.handleChange} name="post_time_date"/></div>

          <div className="form-group col-sm-2">
            <input type="submit" className="form-control" value="Submit Post!"/>
          </div>
        </div>
        </div>
      </form>

    </div>
    )
  }

  handleChange(e) {
    const {value, name} = e.target;
    this.setState({[name]: value});
  }

  handleSubmit(e) {
    const {userid} = this.props.match.params;
    const {post_title, post_text, post_time_date} = this.state;

    e.preventDefault();

    axios.post(`/api/users/${userid}/posts`, {post_title, post_text, post_time_date}).then(res => {
      this.props.history.push(`/users/${userid}`)

    }).catch(e => {
      console.warn(e);
      alert("Trouble with posting new user entry!")
    })
  }

}

export default PostNew;
