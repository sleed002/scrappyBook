import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class postShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {post:null};
  }

  render() {
    const { post } = this.state;
    if (!post) {
      return <div>Looking for Post..</div>;}

      const {post_id, user_id, post_time_date, post_text} = post;

      return(
        <div className="postShow">
          <h1>More Information On:</h1>
             <h4>{post.post_id}</h4>
             <p>{post.post_time_date} </p>
             <p>{post.post_text}</p>
        </div>
      );
    }

    renderPostLink(post) {
      return (
        <li key={post.post_id}><Link to={`/users/${post.user_id}/posts/${post.post_id}`}>{post.post_text}</Link>
      </li>
    )  ;
    }

    componentDidMount () {
      const { user_id } = this.props.match.params,
            { post_id } = this.props.match.params;
      axios.get(`/api/users/${user_id}/posts/${post_id}`).then(res => {
        this.setState({post:res.data})
      });
    }
  }

export default postShow;
