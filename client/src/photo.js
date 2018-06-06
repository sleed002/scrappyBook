import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Photo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      photo: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
           <img src={photo.photo_url} height="400px" alt=""></img>
           <br/>
           <span className="usersIndicator">Caption:</span>
           <input className="usersIndicator" value={this.handleBlankCaption(photo.photo_caption)} name="photo_caption" onChange={this.handleChange}></input>
           <button className="btn btn-sm btn-outline-secondary" onClick={() => this.handleSubmit()}>Update Caption</button>
           <br/>
           <br/>
           <button className="btn btn-sm btn-outline-secondary" onClick={() => this.handleDelete()}>Delete photo</button>
           <Link to={`/users/${user_id}/posts/${post_id}`} className="btn btn-sm btn-outline-secondary">Go Back</Link>
          </div>
        </div>
      );
    }

    handleChange (e) {
     const {value} = e.target;
     const newState = Object.assign(this.state.photo, {photo_caption: value});
     //buddy help with object assign
     this.setState(newState);
    }

    handleSubmit() {
      const { match } = this.props;
      const { user_id, post_id, photo_public_id} = match.params;
      const {photo} = this.state
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

  handleBlankCaption(caption){
    if(caption !== null){
      return caption;
    } else {
      return "";
    }
  }
}


export default Photo;
