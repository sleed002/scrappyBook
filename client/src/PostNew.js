import React from 'react';
import axios from 'axios';

class PostNew extends React.Component{
  constructor(props){
    super(props);
    //UPDATE POST TIME TO BE AUTOMATIC!
    //Getting current time & date: https://stackoverflow.com/a/14638063
    var d = new Date();
    this.state = {post_text: "", post_time_date: d.toLocaleString()}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render(){
    const {post_text} = this.state;
    const {post_time_date} = this.state;
    return(
      <form onSubmit={this.handleSubmit}>
        Post Text:
        <br/>
        <textarea value={post_text} name="post_text" onChange={this.handleChange} placeholder="text here!" />
        <br/>
        <input value={post_time_date} onChange={this.handleChange} name="post_time_date" />
        <br/>
        <input type="submit" value="Submit Post!" />
      </form>
    )
  }

  handleChange(e) {
    const {value, name} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    debugger;
    const {userid} = this.props.match.params;
    const {post_text} = this.state;
    const {post_time_date} = this.state;

    e.preventDefault();

    axios.post(`/api/users/${userid}/posts`, {post_text, post_time_date})
    .then(res => {
      this.props.history.push(`/users/${userid}`);
    }).catch(e => {
      console.warn(e);
      alert("Trouble with posting new user entry!")
    })
  }


}

export default PostNew;
