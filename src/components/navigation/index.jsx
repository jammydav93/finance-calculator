import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadButton from '../load';
import SaveButton from '../save';
import SignInButton from '../signin';
import SignOutButton from '../signout';
import Loading from '../loading';
import './index.scss';

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
  <div className="navbar">
    { loading ? <Loading /> : showAuthedNavBar(authUser) }
  </div>
);

Navigation.propTypes = {
  loading: PropTypes.bool.isRequired,
  authUser: PropTypes.object.isRequired,
};

const NavigationAuth = () => (
  <React.Fragment>
    <div className="button">
      <LoadButton />
    </div>
    <div className="button">
      <SaveButton />
    </div>

    <div className="button">
      <SignOutButton />
    </div>
  </React.Fragment>
);

const NavigationNonAuth = () => (
  <div className="button">
    <SignInButton />
  </div>
);

export default connect(mapStateToProps)(Navigation);
