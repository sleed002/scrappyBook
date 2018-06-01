import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Photo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      photo: null,
      backgroundColor: "rgb(236, 223, 206)"
    };
  }

  render() {
    const {photo} = this.state;
    const {match} = this.props;
    const {user_id, post_id} = match.params;
    if (!photo) {
      return <div>Looking for Photo..</div>;
    }

    // const {photo_url, photo_caption, photo_public_id} = photo;

    return (
        <div className="App">
        <div className="photo">


             <img src={photo.photo_url} height="400px"></img>
             <br></br>
             Caption:<input value={photo.photo_caption} name="photo.photo_caption" onChange={this.handleChange}></input>
             <button onClick={() => this.handleSubmit()}>Update</button>
             <br></br>
             <br></br>

           <button onClick={() => this.handleDelete()}>Delete photo</button>
           <br></br>
           <Link to={`/users/${user_id}/posts/${post_id}`}>Back</Link>

        </div>
        </div>
      );
    }

    handleChange (e) {
      const {photo} = this.state
     const {value, name} = e.target;
     this.setState({
       [name]: value,
     });
    }

    handleSubmit() {
      const { match, history } = this.props;
      const { user_id, post_id, photo_public_id} = match.params;
      const {photo} = this.state
      console.log(photo)
      axios.put(`/api/users/${user_id}/posts/${post_id}/photos/${photo_public_id}`, photo).then(res => {
        this.props.history.push(`/users/${user_id}/posts/${post_id}`);
      }).catch(e => {
        console.warn(e);
        alert('something went wrong')
      });
    }

    handleDelete() {
    const {match, history} = this.props;
    const {user_id, post_id, photo_public_id} = match.params;
    axios.delete(`/api/users/${user_id}/posts/${post_id}/photos/${photo_public_id}`).then(res => {
      history.push(`/users/${user_id}/posts/${post_id}`);
    });
  }

  componentDidMount() {
    const {user_id, post_id, photo_public_id} = this.props.match.params;
    axios.get(`/api/users/${user_id}/posts/${post_id}`).then(res => {
      this.setState({post: res.data})
    });

    axios.get(`/api/users/${user_id}/posts/${post_id}/photos/${photo_public_id}`).then(res => {
      this.setState({photo: res.data});
    });
  }
}


export default Photo;
