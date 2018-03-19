import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
      <h1>Welcome to My Awesome App</h1>
      <h2>{this.props.data}</h2>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>

      </div>
    );
  }
}

export default Home;
