import React from "react";
import {Post} from "./post";
import {NewPostForm} from "./newPostForm";

export class Timeline extends React.Component {
  constructor(props) {
    super();
    this.state = {
      posts: [],
    };
    this.fetchPosts = this.fetchPosts.bind(this);
  }

  render() {
    const posts = this.state.posts;
    return (

        <div>
          <NewPostForm updateParent={this.fetchPosts}/>
          {postsList(posts)}
        </div>
    )
  }
  componentDidMount() {
    this.fetchPosts();
    this.intervalId = setInterval(this.fetchPosts().bind(this), 2000);
  }
  componentWillUnmount(){
    clearInterval(this.intervalId);

  fetchPosts() {
    console.log('API Called');
    fetch('https://acebook2018.herokuapp.com/posts')
        .then(response => response.json())
        .then(data =>
            this.setState({posts: data})
        )
  }
}

function postsList(posts) {
  return posts.map(function (post) {
    return <Post
        message={post.message}
        time={post.created_at}
        id={post.id}
    />
  })
}
