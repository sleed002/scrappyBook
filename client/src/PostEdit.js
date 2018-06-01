import React from 'react';
import axios from 'axios';
// import {Link} from 'react-router-dom';
// import PostNew from './PostNew';

class PostEdit extends React.Component {
  constructor(props) {
    super(props);
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
      <h3>Edit a Post</h3>
      <div className="PostEdit">

        <div className="form-group col-md-2">
          <h4>Post Title:</h4>
          <input value={post_title} className="form-control" name="post_title" onChange={this.handleChange}/></div>

        <div class="form-group col-md-6">
          <label for="exampleFormControlTextarea1">
            <h4>Post Text</h4>
          </label>
          {/* Post Text: <input value={post_text} className="form-control" id="exampleFormControlTextarea1" rows="3" name="post_text" onChange={this.handleChange}/></div> */}
          <textarea class="form-control" value={post_text} id="exampleFormControlTextarea1" rows="3" name="post_text" onChange={this.handleChange}></textarea>
        </div>

        <div className="form-group col-md-2">
          <h4>Post Time:</h4>
          <input value={post_time_date} className="form-control" name="post_time_date" onChange={this.handleChange}/>
          <br/></div>

        <div className="form-group col-md-2">
          <button className="form-control" onClick={this.handleSubmit}>Update Post</button>
        </div>
      </div>
    </div>)
  }

  handleChange(e) {
    const {value, name} = e.target;
    this.setState({[name]: value});
  }

  handleSubmit() {
    const {user_id} = this.props.match.params;
    const {post_id} = this.props.match.params;
    const {post_title, post_time_date, post_text} = this.state;
    axios.put(`/api/users/${user_id}/posts/${post_id}`, {post_title, post_time_date, post_text}).then(res => {
      this.props.history.push(`/users/${user_id}/posts/${post_id}`);
    }).catch(e => {
      console.warn(e);
      alert('Something went wrong');
    });
  }

  componentDidMount() {
    const {post_id} = this.props.match.params;
    const {user_id} = this.props.match.params;
    axios.get(`/api/users/${user_id}/posts/${post_id}`).then(res => {
      const {post_title, post_text} = res.data;
      this.setState({post_title, post_text});
    });
  }
}

export default PostEdit;
