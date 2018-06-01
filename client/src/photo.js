import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Photo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {photo:null, backgroundColor: "rgb(236, 223, 206)"};
  }


  render() {
    const { photo } = this.state;
    const { match, history } = this.props;
    const { user_id, post_id} = match.params;
    if (!photo) {
      return <div>Looking for Photo..</div>;}

      const {photo_url, photo_caption, photo_public_id} = photo;

      return(
        <div className="App">
        <div className="photo">




             <img src={photo.photo_url} height="400px"></img>
             <h2>Caption: {photo.photo_caption}</h2>
             <br></br>


           <button onClick={() => this.handleDelete()}>Delete photo</button>
           <br></br>
           <Link to={`/users/${user_id}/posts/${post_id}`}>Back</Link>

        </div>
        </div>
      );
    }

    handleDelete () {
      const { match, history } = this.props;
      const { user_id, post_id, photo_public_id} = match.params;

      axios.delete(`/api/users/${user_id}/posts/${post_id}/photos/${photo_public_id}`).then(res => {

        history.push(`/users/${user_id}/posts/${post_id}`);


      });
    }


    componentDidMount () {
      const { user_id , post_id, photo_public_id} = this.props.match.params;

      axios.get(`/api/users/${user_id}/posts/${post_id}`).then(res => {
        this.setState({post:res.data})
      });
      axios.get(`/api/users/${user_id}/posts/${post_id}/photos/${photo_public_id}`).then(res => {
        this.setState({photo: res.data});
      });
    }
  }

export default Photo;
