import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PostAll.css';

class AllPosts extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      posts:[]
    }
  }

  render () {
    const className = "Posts";
    const { posts } = this.state;

    if (!posts) {
      return <div className={className}>loading...</div>;
    }

    return (
      <div className={className}>
          <h1>All Posts!</h1>
        {posts.map(post => this.renderPosts(post))}
      </div>
    );
  }

  renderPosts (post) {
    const setLength = 100;
    let postSnippet = "";
    if(post.post_text.length <= setLength){
      postSnippet = post.post_text
    } else {
      postSnippet = post.post_text.slice(0, 100) + "..."
    }
    // postSnippet = postSnippet.slice(0, 100)
    return (
      <div className='UserAndPostSection'>
        <div key={post.user_id} className='UserSection'>
          <img src={post.user_avatar} alt="user avatar" width="100px"/>
          <p>{post.username}</p>
        </div>
        <div key={post.post_id} className='PostSection'>
          <ul>
            <h3><Link to={`/users/${post.user_id}/posts/${post.post_id}`}>{post.post_title}</Link></h3>
            <p>{postSnippet}</p>
            {post.photoarr.map(photo => this.renderPhotos(photo))}
          </ul>
        </div>
      </div>
    );
  }

  renderPhotos (photo) {
    return(
        <img src={photo} height="150px" className="PostPreviewImg"/>
    )
  }

  componentDidMount () {
    axios.get(`/api/posts`).then(res => {
      this.setState({posts: res.data});
    });
  }
}

export default AllPosts;
