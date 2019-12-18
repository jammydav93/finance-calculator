import React from 'react';
import styles from './App.module.scss';
import WithAuthentication from './components/WithAuthentication';

export const App = () => (
  <div className={styles.app}>
    This is a testy test
  </div>
);

const AuthenticatedApp = () => (
  <WithAuthentication>
    <App />
  </WithAuthentication>
);

export default AuthenticatedApp;
