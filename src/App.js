import React from 'react';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Navigation from './components/Navigation';
import Projector from './components/Projector';
import './index.css';

import withAuthentication from './components/withAuthentication';


let App = () => (
  <div>

    <h1>Finance Forecaster</h1>

    <Navigation />

    <div className="content">
      <Switch>
        <Route exact path="/" component={Projector} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/projector" component={Projector} />
      </Switch>
    </div>

  </div>
);

App = withAuthentication(App)

export default withRouter(App)
