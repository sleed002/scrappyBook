import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './PostAll.css';

class AllPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  render() {
    const className = "Posts";
    const {posts} = this.state;

    if (!posts) {
      return <div className={className}>loading...</div>;
    }

    return (<div className="App">
      <div className={className}>
        <h3>All Posts!</h3>
        {posts.map(post => this.renderPosts(post))}
      </div>
    </div>);
  }

  renderPosts(post) {
    const setLength = 100;
    let postSnippet = "";
    if (post.post_text.length <= setLength) {
      postSnippet = post.post_text
    } else {
      postSnippet = post.post_text.slice(0, 100) + "..."
    }
    return (<div key={post.post_id} className='UserAndPostSection'>
      <div className='UserSection'>
        <img src={post.user_avatar} alt="user avatar" width="100px"/>
        <p>
          <b>Username: </b>
          {post.username}</p>
        <p>
          <b>Nickname: </b>
          {this.ifFieldBlank(post.user_nickname)}</p>
        <p>
          <b>Bio: </b>
          {this.ifFieldBlank(post.user_bio)}</p>
        <p>
          <b>Favorite Color: </b>
          {this.ifFieldBlank(post.user_fave_color)}</p>
      </div>
      <div className='PostSection'>
        <ul>
          <h3>
            <Link to={`/users/${post.user_id}/posts/${post.post_id}`}>{post.post_title}</Link>
          </h3>
          <p>{postSnippet}</p>
          <div className='PhotoSection'>
            {post.photoarr.map(photo => this.renderPhotos(photo))}
          </div>
        </ul>
      </div>
    </div>);
  }

  renderPhotos(photo) {
    return (<img key={photo} src={photo} height="150px" className="PostPreviewImg" alt="User Submitted Pic"/>)
  }

  componentDidMount() {
    axios.get(`/api/posts`).then(res => {
      this.setState({posts: res.data});
    });
  }

  ifFieldBlank(input) {
    if (input === undefined) {
      return "n/a";
    } else {
      return input;
    }
  }
}

export default AllPosts;
