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
    return (
      <div className="App">
      <div className="postShow">

      <div className="container-fluid">
        <input type="file" name="sampleFile" encType="multipart/form-data" onChange={this.fileHandler} />
        <button className="btn btn-light" onClick={this.uploadHandler}>Upload!</button>
        <br /><br />
        <div className="row">
          <Link className="btn btn-outline-secondary" to={`/users/${post.user_id}/posts/${post.post_id}/edit`}>Edit Post
          </Link>
          <Button className="btn btn-outline-secondary" onClick={() => this.handleDelete()}>Delete entry</Button>
        </div>
        <br/>
        <div className="postInfo">
          <h4><span className="postTitleUserPage">{post.post_title}
          </span></h4>
          <p>{post.post_time_date}
          </p>
          <p>{post.post_text}</p>
        </div>

        {/* SOURCE: [Alice] Buddy assisted with Masonry
  SOURCE: https://stackoverflow.com/questions/27892267/masonry-columnwidth
  SOURCE: https://www.npmjs.com/package/react-masonry-layout */
        }
        <Masonry>
          {photos.map((photo, index) => this.renderPhotos(photo, index))}
        </Masonry>

      </div>
    </div>
  </div>

  );
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
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <h5 className="card-title"></h5>
          <p className="card-text">
            <Link to={`${photo.post_id}/photos/${photo.photo_public_id}`}><img className="imageResize" key={photo.photo_id} src={photo.photo_url} height="250px"/></Link>
          </p>

          <div className="card-footer text-muted">Caption: {photo.photo_caption}<br/></div>
        </div>
      </div>

      <Link to={`${photo.post_id}/photos/${photo.photo_public_id}`}></Link>
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
