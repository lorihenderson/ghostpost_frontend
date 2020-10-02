import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      post: [],
      upvotes: 0,
      downvotes: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  };

  componentDidMount() {
    fetch("http://localhost:8000/api/posts")
      .then((res) => res.json())
      .then((data) => this.setState({post: data}));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(document.getElementById("userinput").value)
    console.log(document.getElementById("choice").checked)
    let data = {
      choices: document.getElementById("choice").checked,
      user_input: document.getElementById("userinput").value
    }

    fetch("http://localhost:8000/api/posts/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    });
  }



  handleIncrement = (id) => {
    fetch("http://localhost:8000/api/posts/" + id + "/upvote/")
    .then((res) => res.json())
    .then((data) => this.forceUpdate(this.componentDidMount));
    // console.log(id)
  }

  handleDecrement = (id) => {
    fetch("http://localhost:8000/api/posts/" + id + "/downvote/")
    .then((res) => res.json())
    .then((data) => this.forceUpdate(this.componentDidMount));
    console.log(id)
  }

  handleBoasts = (event) => {
    fetch("http://localhost:8000/api/posts/all_boasts/")
    .then((res) => res.json())
    .then((data) => this.setState({post: data}));
  }

  handleRoasts = (event) => {
    fetch("http://localhost:8000/api/posts/all_roasts/")
    .then((res) => res.json())
    .then((data) => this.setState({post: data}));
  }

  handleSortVotes = (event) => {
    fetch("http://localhost:8000/api/posts/total_votes/")
    .then((res) => res.json())
    .then((data) => this.setState({post: data}));
  }

  render() {
    return (
      <div>
        <h1 id="title">Ghosts, Boasts, Roasts, and All Things Posts</h1>
        <button onClick={this.handleBoasts}>Filter By Boasts</button> <button onClick={this.handleRoasts}>Filter By Roasts</button><button onClick={this.handleSortVotes}>Filter By Votes</button>

        <form id="postForm" onSubmit={this.handleSubmit}>
          <h3>User Input: 
          <input
            id="userinput"
            name="input"
            type="text"
          /></h3>
          <h3>Check for Boast, don't for Roast
          <input
            id="choice"
            value="true"
            type="checkbox"
          /></h3>
          <button>Create Post</button>
        </form>
        <hr class="rounded"></hr>

        {this.state.post.map((p) => (
          <div>
          <h1>{p.choices ? 'Boast' : 'Roast'}</h1>
          <h2>
            ID: {p.id}
          </h2>
          <h2>
            Time Posted: {p.time_posted}
          </h2>
          <h2>
            User Input: {p.user_input}
          </h2>
          <h2>
            Upvotes: {p.upvotes}
            <button onClick={e => this.handleIncrement(p.id)}>
              Upvote
            </button>
          </h2>
          <h2>
            Downvotes: {p.downvotes}
            <button onClick={e => this.handleDecrement(p.id)}>
              Downvote
            </button>
          </h2>

          <hr class="rounded"></hr>
          </div>
        ))}

      </div>
    );
  };
};

export default App;
