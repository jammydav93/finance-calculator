import React from 'react';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
//import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Navigation from './components/Navigation';
import Projector from './components/Projector';
import './App.scss';

import withAuthentication from './components/withAuthentication';


let App = () => (
  <div className="app-container" >
    <h1 className="app-title">Finance Forecaster</h1>
    <Navigation />
    <div className="content">
      <Switch>
        <Route exact path="/" component={Projector} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/projector" component={Projector} />
      </Switch>
    </div>
  </div>
);

App = withAuthentication(App)

export default withRouter(App)
