import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';

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

      <div className="App">
      <div className={className}>
          <h3>User Information</h3>


          <div className="Container">
            <div className="row">

              <div className="col-md-4">
                <div className="UserImage">
                  <h4><img className="img-thumbnail" src={users.user_avatar} alt={users.username} height="200px" /></h4>
                </div>
              </div>

              <div className="col-md-4">
                <h4><span className="usersIndicator">Name:</span> {users.username}</h4>
                <h4><span className="usersIndicator">Nickname:</span> {users.user_nickname}</h4>
                <h4><span className="usersIndicator">Bio:</span> {users.user_bio}</h4>
                <h4><span className="usersIndicator">Favorite Color:</span> {users.user_fave_color}</h4>
              </div>

              <div className="col-md-8"><Button className="btn btn-sm btn-outline-secondary" onClick={() => this.handleDelete()}>Delete a user</Button>
              <Link to={`/users/${users.user_id}/edit`}><Button className="btn btn-sm btn-outline-secondary"> Edit</Button> </Link>
              <Link to={`/users/${users.user_id}/posts/new`}><Button className="btn btn-sm btn-outline-secondary"> Create New Entry</Button> </Link>
              </div>

            </div>
          </div>

          <div className="Posts">
            {posts.map(post => this.renderPosts(post))}
          </div>

        {/* <button onClick={() => this.handleDelete()}>Delete a user</button>
        <br/>
        <Link to={`/users/${users.user_id}/edit`}> Edit </Link>
        <br/>
        <Link to={`/users/${users.user_id}/posts/new`}> Create New Entry </Link> */}

    </div>
  </div>

    );
  }

  renderPosts (post) {
    let userid = post.user_id
    let postid = post.post_id
    const setLength = 100;
    let postSnippet = "";
    if(post.post_text.length <= setLength){
      postSnippet = post.post_text
    } else {
      postSnippet = post.post_text.slice(0, 100) + "..."
    }
    return (
<<<<<<< HEAD
      <div className = "UserPost">
        <ul key={post.post_id}>
          <h3><Link to={`/users/${userid}/posts/${postid}`}>{post.post_title}</Link></h3>
          <p>{postSnippet}</p>
          {this.state.photos.map(photo => this.renderPhotos(userid, photo, postid))}
        </ul>
      </div>
=======
      <div>
        <div key={post.post_id} className='Post'>
          <ul>
            {/* <h3><Link to={`/users/${userid}/posts/${postid}`}>Post Header for post #{postid}!</Link></h3> */}
            <h4><Link to={`/users/${userid}/posts/${postid}`}>{post.post_title}</Link></h4>
            <p>{postSnippet}
            </p>
            {this.state.photos.map(photo => this.renderPhotos(userid, photo, postid))}
          </ul>
        </div>
    </div>
>>>>>>> remove duplicate posts on user entries page
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
