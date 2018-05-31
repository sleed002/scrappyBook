import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class User extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      users:[],
      posts:[],
      photos:[]
    }
  }

  render () {
    const className = "User";
    const { users, posts} = this.state;

    if (!users && !posts) {
      return <div className={className}>loading...</div>;
    }

    return (
      <div className={className}>
        <div className='User-Info'>
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
        <Link to={`/users/${users.user_id}/posts/new`}> Create New Entry </Link>

      </div>
    );
  }

  renderPosts (post) {
    let userid = post.user_id
    let postid = post.post_id
    return (
      <ul key={post.post_id}>
        <h3><Link to={`/users/${userid}/posts/${postid}`}>{post.post_title}</Link></h3>
        <p>{post.post_text}</p>
        {this.state.photos.map(photo => this.renderPhotos(userid, photo, postid))}
      </ul>
    );
  }

  renderPhotos (userid, photo, postid) {
    let photoPostId = photo.post_id
    if(postid === photoPostId){
      return (
        photo.photoarr.map(photoUrl => this.renderPhoto(userid, postid, photoUrl))
      );
    }
  }

  renderPhoto(userid, postid, photoUrl){
    return(
      <span key={photoUrl}>
        <Link to={`/users/${userid}/posts/${postid}`}>
        <img src={photoUrl} height="200px" alt="User submitted pic for their post"/></Link>
      </span>
    )
  }

  handleDelete () {
    const { match, history } = this.props;
    const { id } = match.params;

    axios.delete(`/api/users/${id}`).then(res => {
      history.push('/users'); // another way to redirect (props.history.push)
    });
  }


  componentDidMount () {
    const { id } = this.props.match.params;
    axios.get(`/api/users/${id}`).then(res => {
      this.setState({users: res.data});
    });
    axios.get(`/api/users/${id}/posts`).then(res => {
      this.setState({posts: res.data});
    });
    axios.get(`/api/users/${id}/postspics`).then(res => {
      this.setState({photos: res.data});
    });
  }
}

export default User;
