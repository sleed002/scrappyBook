import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import MasonryLayout from 'react-masonry-layout';

class postShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: null,
      photos: []
    };
  }

  render() {
    const {post, photos} = this.state;
    if (!post) {
      return <div>Looking for Post..</div>;
    }

    const {post_id, user_id, post_title, post_time_date, post_text} = post;
    const {photo_url, photo_caption, photo_public_id} = photos;
    return (<div className="postShow">
      {photos.map(photo => this.renderPhotos(photo))}

      {/* <div className="Photos">
               {photos.map(photo => this.renderPhotos(photo))}
             </div> */
      }

      <input type="file" name="sampleFile" encType="multipart/form-data" onChange={this.fileHandler}/>
      <button onClick={this.uploadHandler}>Upload!</button>

      <br/>
      <Link to={`/users/${post.user_id}/posts/${post.post_id}/edit`}>
        Edit
      </Link>
      <br/>
      <button onClick={() => this.handleDelete()}>Delete entry</button>
    </div>);
  }

  fileHandler = (event) => {
    this.setState({selectedFile: event.target.files[0]})
  }

  uploadHandler = (event) => {
    const {match, history} = this.props;
    const {user_id} = match.params;
    const {post_id} = match.params;
    const formData = new FormData()
    formData.append('sampleFile', this.state.selectedFile, this.state.selectedFile.name)
    axios.post(`/api/users/${user_id}/posts/${post_id}`, formData).then(res => {
      history.push(`/users/${user_id}`);
    })
  };

  handleDelete() {
    const {match, history} = this.props;
    const {user_id, post_id} = match.params;
    // debugger;
    axios.delete(`/api/users/${user_id}/posts/${post_id}`).then(res => {
      history.push(`/users/${user_id}/`); // another way to redirect (props.history.push)
    });
  }

  renderPhotos(photo) {
    return (
      <div className="photoAndId">
        <div class="card">
          <div class="card-header">Featured</div>
          <div class="card-body">
            <h5 class="card-title"></h5>
            <p class="card-text"><img className="imageResize" key={photo.photo_id} src={photo.photo_url} width="400px"/></p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            <div class="card-footer text-muted">Caption: {photo.photo_caption}<br />Public ID: {photo.photo_public_id}</div>
          </div>
        </div>
        <Link to={`${photo.post_id}/photos/${photo.photo_public_id}`}>
          {/* <img key={photo.photo_id} src={photo.photo_url} width="400px"/> */}
          {/* <p>Public ID: {photo.photo_public_id}, Caption: {photo.photo_caption}</p> */}
        </Link>

        {/* <h1>More Information On:</h1> */}
        <h4>{photo.post_title}
        </h4>
        <p>{photo.post_time_date}
        </p>
        <p>{photo.post_text}</p>
      </div>
    );
  }

  componentDidMount() {
    const {user_id} = this.props.match.params, {post_id} = this.props.match.params;
    axios.get(`/api/users/${user_id}/posts/${post_id}`).then(res => {
      this.setState({post: res.data})
    });
    axios.get(`/api/users/${user_id}/posts/${post_id}/photos`).then(res => {
      this.setState({photos: res.data});
    });
  }
}

export default postShow;
