import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import Masonry from 'react-masonry-component';

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

      <div className="container-fluid">
        <div className="input-group mb-3">
          <div className="custom-file">
            <input type="file" name="sampleFile" encType="multipart/form-data" onChange={this.fileHandler} className="custom-file-input" id="inputGroupFile02"></input>
            <label className="custom-file-label" for="inputGroupFile02">Choose file</label>
          </div>
          <div className="input-group-append">
            <Button className="input-group-text" onClick={this.uploadHandler} id="">Upload Photo</Button>
          </div>
        </div>

        <div className="row">
          <Link className="btn btn-outline-warning" to={`/users/${post.user_id}/posts/${post.post_id}/edit`}>Edit
          </Link>
          <Button className="btn btn-outline-danger" onClick={() => this.handleDelete()}>Delete entry</Button>
        </div>


        <br/>

        <div className="wrapper" style={{
            backgroundColor: this.state.backgroundColor
          }}>
          <select name="operator" id='bg' onChange={(e) => this.change(e)} value={this.state.value}>
            <option value="rgb(236, 223, 206)">Peach</option>
            <option value="rgb(244, 71, 83)">Red</option>
            <option value="rgb(110, 217, 216)">Teal</option>
            <option value="rgb(88, 182, 127)">Green</option>
            <option value="rgb(254, 212, 49)">Yellow</option>
          </select>

          <h4>{post.post_title}
          </h4>
          <p>{post.post_time_date}
          </p>
          <p>{post.post_text}</p>

{/* SOURCE: [Alice] Buddy assisted with Masonry
  SOURCE: https://stackoverflow.com/questions/27892267/masonry-columnwidth
  SOURCE: https://www.npmjs.com/package/react-masonry-layout */}
          <Masonry>
            {photos.map((photo, index) => this.renderPhotos(photo, index))}
          </Masonry>
        </div>

      </div>
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
    axios.delete(`/api/users/${user_id}/posts/${post_id}`).then(res => {
      history.push(`/users/${user_id}/`);
    });
  }

  renderPhotos(photo, index) {
    return (<div className="photoAndId" key={index}>
      <div class="card">
        <div class="card-header">Featured</div>
        <div class="card-body">
          <h5 class="card-title"></h5>
          <p class="card-text">
            <Link to={`${photo.post_id}/photos/${photo.photo_public_id}`}><img className="imageResize" key={photo.photo_id} src={photo.photo_url} width="400px"/></Link>
          </p>

          <div class="card-footer text-muted">Caption: {photo.photo_caption}<br/>Public ID: {photo.photo_public_id}</div>
        </div>
      </div>

<h4>{photo.post_title}</h4>
<p>{photo.post_time_date}</p>
<p>{photo.post_text}</p>

      <Link to={`${photo.post_id}/photos/${photo.photo_public_id}`}>
      </Link>
    </div>);
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

  change(event) {
    this.setState({backgroundColor: event.target.value});
  }
}

export default postShow;
