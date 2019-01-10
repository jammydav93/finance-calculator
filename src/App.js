import React from 'react';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
//import SignUp from './components/SignUp';
import Navigation from './components/navigation';
import Projector from './components/projector';
import './App.scss';
import withAuthentication from './components/withAuthentication';

let App = () => (
  <div className="app" >
    <div className="header"> 
      <h1 className="app-title">Finance Forecaster</h1>
      <Navigation />
    </div>
    <div className="content">
      <Switch>
        <Route path="/" component={Projector} />
      </Switch>
    </div>
  </div>
);

App = withAuthentication(App)

export default withRouter(App)
