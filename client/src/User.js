import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class User extends React.Component {
  constructor (props) {
    super(props);
    // this.state = {
    //   user: {
    //     username: '',
    //     user_nickname: '',
    //     user_bio: '',
    //     user_fave_color: '',
    //     user_avatar: '',
    //     user_id: 0
    //   },
    //   posts: [
    //     {
    //       post_id: 0,
    //       user_id: 0,
    //       post_text: ''
    //     }
    //   ],
    //   photos: [
    //     {
    //       photo_id: 0,
    //       post_id: 0,
    //       photo_url: '',
    //       user_id: 0
    //     }
    //   ]
    // };
    this.state={
      users:[],
      posts:[],
      photos:[]
    }

  }

  render () {
    const className = "User";
    const { users, posts, photos } = this.state;
    // console.log(this.state.photos[0].photo_url)

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
          <Link to={`/user/${users.user_id}/edit`}> Edit </Link>
      </div>
    );
  }

  renderPosts (post) {
    let postid = post.post_id
    // console.log(postid)
    return (
      <div key={post.post_id} className='Post'>
        {/* {console.log(this.state.photos)} */}
        <ul>
          <p>{post.post_text}</p>
          {/* {console.log(this.state.photos[postid])} */}
          {/* {this.state.photos.map(photoData => {
            console.log(photoData)
            // debugger;
            return(
              <div>
                <img src={photoData.photoarr[0]} />

              </div>
            )
          })} */}
          {/* {console.log(this.state.photos[postid])} */}
          {this.state.photos.map(photo => this.renderPhotos(photo, postid))}
        </ul>
    </div>
    );
  }

  renderPhotos (photo, postid) {
    let photoId = photo.photo_id
    let photoPostId = photo.post_id
    // console.log(postid)
    // console.log(photoPostId)
    if(postid === photoPostId){
      return (
        photo.photoarr.map(photoUrl => {
          // console.log(photoUrl)
          // debugger;
          return(
              <img key={photoId} src={photoUrl} height="200px"/>
          )
        })
      );
    }
  }

  handleDelete () {
    const { match, history } = this.props;
    const { id } = match.params;

    axios.delete(`/api/user/${id}`).then(res => {
      history.push('/api/user'); // another way to redirect (props.history.push)
    });
  }


  componentDidMount () {
    // props.match.params contains our url params (just like express!)

    const { id } = this.props.match.params;


    axios.get(`/api/users/${id}`).then(res => {
      this.setState({users: res.data});
    });

    // debugger;
    axios.get(`/api/users/${id}/posts`).then(res => {
      // console.log(res.data)
      this.setState({posts: res.data});
      //For each post get the photos
      // res.data.forEach(post => {
      //   axios.get(`/api/users/${id}/posts/${post.post_id}/photos`).then(res2 => { //change url to correct one
      //     // console.log('goofy', res.data);
      //     res2.data.map((photo) => {
      //         this.setState({photos: res2.data});
      //
      //     })
      //     // this.setState({photos: res.data}); // need to figure out how to set correct state.
      //   })
      // })
    });

    axios.get(`/api/users/${id}/postspics`).then(res => {
      // console.log(res.data);
      this.setState({photos: res.data});
    });

  }
}

export default User;
