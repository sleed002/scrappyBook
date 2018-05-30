import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class photo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {photo:null};
  }


  render() {
    const { photo } = this.state;
    if (!post) {
      return <div>Looking for Photo..</div>;}

      const {photo_url, photo_caption, photo_public_id} = photo;

      return(
        <div className="postShow">
          <h1>More Information On:</h1>
             <h4>{photo.photo_url} </h4>
             <p>{photo.photo_public_id} </p>
             <p>{photo.photo_caption}</p>


           {/* <br />
           <Link to={`/users/${post.user_id}/posts/${post.post_id}/edit`}> Edit </Link>
           <br/>
           <button onClick={() => this.handleDelete()}>Delete entry</button> */}

        </div>
      );
    }

    // handleDelete () {
    //   const { match, history } = this.props;
    //   const { user_id, post_id } = match.params;
    //   // debugger;
    //   axios.delete(`/api/users/${user_id}/posts/${post_id}`).then(res => {
    //     history.push(`/users/${user_id}/`); // another way to redirect (props.history.push)
    //   });
    // }


    componentDidMount () {
      const { user_id } = this.props.match.params,
            { post_id } = this.props.match.params;
      axios.get(`/api/users/${user_id}/posts/${post_id}`).then(res => {
        this.setState({post:res.data})
      });
      axios.get(`/api/users/${user_id}/posts/${post_id}/photos/${photo.photo_public_id}`).then(res => {
        this.setState({photos: res.data});
      });
    }
  }

export default postShow;
