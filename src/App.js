import React from 'react';
import Navigation from './components/navigation';
import Projector from './components/projector';
import './App.scss';
import withAuthentication from './components/withAuthentication';

export const App = () => (
  <div className="app" >
    <div className="header"> 
      <h1 className="app-title">Finance Forecaster</h1>
      <Navigation />
    </div>
    <div className="content">
      <Projector />
    </div>
  </div>
);

export default withAuthentication(App)