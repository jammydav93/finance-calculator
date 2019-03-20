import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadButton from '../Load';
import SaveButton from '../Save';
import SignInButton from '../Signin';
import SignOutButton from '../Signout';
import Loading from '../Loading';
import styles from './index.module.scss';

const mapStateToProps = (state) => {
  const {
    authUser,
    loading,
  } = state.sessionState;

  return {
    authUser,
    loading,
  };
};

const showAuthedNavBar = authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />);

const Navigation = ({ loading, authUser }) => (
  <div className={styles.navbar}>
    <div className={styles['navbar-children']}>
      { loading ? <Loading /> : showAuthedNavBar(authUser) }
    </div>
  </div>
);

Navigation.propTypes = {
  loading: PropTypes.bool.isRequired,
  authUser: PropTypes.object.isRequired,
};

const NavigationAuth = () => (
  <React.Fragment>
    <div className={styles.button}>
      <LoadButton />
    </div>
    <div className={styles.button}>
      <SaveButton />
    </div>

    <div className={styles.button}>
      <SignOutButton />
    </div>
  </React.Fragment>
);

const NavigationNonAuth = () => (
  <div className={styles.button}>
    <SignInButton />
  </div>
);

export default connect(mapStateToProps)(Navigation);
