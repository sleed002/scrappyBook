import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class postShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {post:null};
  }

  render() {
    const { post } = this.state;
    if (!post) {
      return <div>Looking for Post..</div>;}

      const {post_id, user_id, post_title, post_time_date, post_text} = post;
      console.log(post)

      return(
        <div className="postShow">
          <h1>More Information On:</h1>
             <h4>{post.post_id}</h4>
             <h4>{post.post_title} </h4>
             <p>{post.post_time_date} </p>
             <p>{post.post_text}</p>

             <input type="file" name="sampleFile" encType="multipart/form-data" onChange={this.fileHandler}/>
             <button onClick={this.uploadHandler}>Upload!</button>

           <br />
           <Link to={`/users/${post.user_id}/posts/${post.post_id}/edit`}> Edit </Link>
           <br/>
           <button onClick={() => this.handleDelete()}>Delete entry</button>

        </div>
      );
    }

  fileHandler = (event) => {
  this.setState({selectedFile: event.target.files[0]})
}

uploadHandler = (event) => {
  const {match, history } = this.props;
  const { user_id } = match.params;
  const { post_id } = match.params;
  const formData = new FormData()
  formData.append('sampleFile', this.state.selectedFile, this.state.selectedFile.name)
  axios.post(`/api/users/${user_id}/posts/${post_id}`, formData).then(res => {
    history.push('/users');
})
};


    handleDelete () {
      const { match, history } = this.props;
      const { user_id, post_id } = match.params;
      // debugger;
      axios.delete(`/api/users/${user_id}/posts/${post_id}`).then(res => {
        history.push(`/users/${user_id}/`); // another way to redirect (props.history.push)
      });
    }

    componentDidMount () {
      const { user_id } = this.props.match.params,
            { post_id } = this.props.match.params;
      axios.get(`/api/users/${user_id}/posts/${post_id}`).then(res => {
        this.setState({post:res.data})
      });
    }
  }

export default postShow;
