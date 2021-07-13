import PageHeader from './common/pageHeader'
import React, { Component } from "react";
import { Link } from "react-router-dom";
import postsService from "../services/postsService";
import Post from "./common/post";

class Posts extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data } = await postsService.getMyPosts();
    if (data.length) {
      this.setState({ posts: data });
    }
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="container">
        <PageHeader titleText="Posts" />
        <div className="row">
          <div className="col-12">
            <Link to="/create-post">Create a new post</Link>
          </div>
        </div>
        <div className="row">
          {posts.length ? (
            posts.map((post) => <Post post={post} key={post._id} />)
          ) : (
            <p>No posts, create one</p>
          )}
        </div>
      </div>
    );
  }
}

export default Posts;
 
