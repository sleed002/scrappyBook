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
        {/* <div className='User-Info'>
          <h3>User Information</h3>
          <h4>Name: {users.username}</h4>
          <h4>Nickname: {users.user_nickname}</h4>
          <h4>Bio: {users.user_bio}</h4>
          <h4>Favorite Color: {users.user_fave_color}</h4>
          <h4><img src={users.user_avatar} alt={users.username} /></h4>
          <div className="Posts">
            {posts.map(post => this.renderPosts(post))}
          </div>
        </div>
        <button onClick={() => this.handleDelete()}>Delete a user</button>
        <br/>
        <Link to={`/users/${users.user_id}/edit`}> Edit </Link>
        <br/>
        <Link to={`/users/${users.user_id}/posts/new`}> Create New Entry </Link> */}
          <h1>All Posts!</h1>
        {posts.map(post => this.renderPosts(post))}

      </div>
    );
  }

  renderPosts (post) {
    // let userid = post.user_id
    // let postid = post.post_id
    // console.log(postid)
    return (
      <div className='UserAndPostSection'>
        <div key={post.user_id} className='UserSection'>
          <img src={post.user_avatar} alt="user avatar" width="100px"/>
          <p>{post.username}</p>
        </div>
        <div key={post.post_id} className='PostSection'>
          <ul>
            <h3><Link to={`/users/${post.user_id}/posts/${post.post_id}`}>{post.post_title}</Link></h3>
            {/* <p>{post.post_text}</p> */}
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

  // handleDelete () {
  //   const { match, history } = this.props;
  //   const { id } = match.params;
  //
  //   axios.delete(`/api/users/${id}`).then(res => {
  //     history.push('/users'); // another way to redirect (props.history.push)
  //   });
  // }


  componentDidMount () {
    axios.get(`/api/posts`).then(res => {
      this.setState({posts: res.data});
    });
  }
}

export default AllPosts;
