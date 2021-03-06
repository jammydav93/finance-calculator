import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Navigation from './components/Navigation';
import Projector from './components/Projector';
import styles from './App.module.scss';
import WithAuthentication from './components/WithAuthentication';

export const App = () => (
  <div className={styles.app}>
    <div className={styles.header}>
      <Navigation />
    </div>
    <div className={styles.content}>
      <Switch>
        <Route path="/version">
          <div>
            version=
            {process.env.REACT_APP_VERSION}
          </div>
          <div>
            last-commit-id=
            {process.env.REACT_APP_LAST_COMMIT_ID}
          </div>
        </Route>
        <Route path="/">
          <Projector />
        </Route>
      </Switch>
    </div>
  </div>
);

const AuthenticatedApp = () => (
  <WithAuthentication>
    <App />
  </WithAuthentication>
);

export default AuthenticatedApp;
