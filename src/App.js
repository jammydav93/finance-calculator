import React, { Component } from "react";
import {
  Route,
  BrowserRouter
} from "react-router-dom";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Navigation from './components/Navigation';
import Homepage from "./components/Homepage";
import Home from "./Home";
import './index.css';

import withAuthentication from './components/withAuthentication';


class App extends Component {
  render() {
      return (
        <BrowserRouter>
          <div>
            <h1>Finance Forecaster SPA</h1>

            <Navigation/>

            <div className="content">
              <Route exact path="/" component={Homepage}/>
              <Route exact path="/signup" component={SignUp}/>
              <Route exact path="/signin" component={SignIn}/>
              <Route exact path="/homepage" component={Homepage}/>
            </div>


          </div>
        </BrowserRouter>
      );
    }
}

export default withAuthentication(App);
