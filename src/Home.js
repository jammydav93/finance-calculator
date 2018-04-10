import React from "react";
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { articles: state.articles}
}

const Home = ({ articles }) => (
  <div>
    <h1>Welcome to My Awesome App</h1>
    <div id="loader">Loading...</div>
  </div>
);

export default connect(mapStateToProps)(Home);
