import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class User extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      user: {
        username: '',
        user_nickname: '',
        user_bio: '',
        user_fave_color: '',
        user_avatar: '',
        user_id: 0
      },
      posts: [
        {
          post_id: 0,
          user_id: 0,
          post_text: ''
        }
      ],
      photos: [
        {
          photo_id: 0,
          post_id: 0,
          photo_url: '',
          user_id: 0
        }
      ]
    };
  }

  render () {
    const className = "User";
    const { user, posts, photos } = this.state;

    if (!user && !posts) {
      return <div className={className}>loading...</div>;
    }

    return (
      <div className={className}>
        <div className='User-Info'>
          <h3>User Information</h3>
          <h4>Name: {user.username}</h4>
          <h4>Nickname: {user.user_nickname}</h4>
          <h4>Bio: {user.user_bio}</h4>
          <h4>Favorite Color: {user.user_fave_color}</h4>
          <h4><img src={user.user_avatar} alt={user.username} /></h4>
          <div className="Posts">
            {posts.map(post => this.renderPosts(post))}
          </div>
        </div>
        <button onClick={() => this.handleDelete()}>Delete a user</button>
        <br/>
          <Link to={`/user/${user.user_id}/edit`}> Edit </Link>
      </div>
    );
  }

  renderPosts (post) {
    return (
      <div key={post.post_id} className='Post'>
        <ul>
          <p>{post.post_text}</p>
      
        </ul>
    </div>
    );
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
      this.setState({user: res.data});
    });

    axios.get(`/api/users/${id}/posts`).then(res => {
      console.log(res.data)
      this.setState({posts: res.data});

      //For each post get the photos
      res.data.forEach(function(post) {
        axios.get(`/api/users/${id}/posts/${post.post_id}/photos`).then(res => { //change url to correct one
          console.log('goofy', res.data);
          // this.setState({photos: res.data}); // need to figure out how to set correct state.
        })
      })
    });

  }
}

export default User;
