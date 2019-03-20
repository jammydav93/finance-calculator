import React from 'react';
import Navigation from './components/Navigation';
import Projector from './components/Projector';
import styles from './App.module.scss';
import WithAuthentication from './components/WithAuthentication';

export const App = () => (
  <div className={styles.app}>
    <div className={styles.header}>
      <h1 className={styles['app-title']}>Money Flux</h1>
      <Navigation />
    </div>
    <div className={styles.content}>
      <Projector />
    </div>
  </div>
);

const AuthenticatedApp = () => (
  <WithAuthentication>
    <App />
  </WithAuthentication>
);

export default AuthenticatedApp;
