import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PostNew from './PostNew';

class PostEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { post_text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const {post_text} = this.state;

    return(
      <div className="PostEdit">
        Text: <input value={post_text} name="post_text" onChange={this.handleChange}/>
      <br />
      <button onClick={this.handleSubmit}>Update Post</button>
      </div>
    )
  }

  handleChange(e) {
    const {value, name} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    const {user_id} = this.props.match.params;
    const {post_id} = this.props.match.params;
    const {post_time_date, post_text} = this.state;
    debugger;
    axios.put(`/api/users/${user_id}/posts/${post_id}`, {post_time_date, post_text}).then(res => {
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
      const {post_time_date, post_text} = res.data;
      this.setState({post_time_date, post_text});
    });
  }
}

export default PostEdit;
