import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOutButton from './components/SignOut';
import Navigation from './components/Navigation';
import Homepage from "./components/Homepage";
import Home from "./Home";
import { save, load } from './utils/firebaseHelper';
import './index.css';

import withAuthentication from './components/withAuthentication';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      outgoingsFromChild: null
    };
  }

  myCallback = (dataFromChild) => {
          //[...we will use the dataFromChild here...]
          this.setState({
            userData: dataFromChild
          });
  }


  render() {
      return (
        <HashRouter>
          <div>
            <h1>Finance Forecaster SPA</h1>

            <Navigation data={this.state.userData}/>

            <div className="content">
              <Route exact path="/" component={Home} data={this.state.outgoingsFromChild}/>
              <Route exact path="/signup" component={SignUp}/>
              <Route exact path="/signin" component={SignIn}/>
              <Route exact path="/homepage" render={(props) => (
                <Homepage callbackFromParent={this.myCallback} />
              )}/>
            </div>


          </div>
        </HashRouter>
      );
    }
}

export default withAuthentication(App);
