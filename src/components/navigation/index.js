import React from 'react';
import { Link } from 'react-router-dom';
import LoadButton from '../load';
import SaveButton from '../save';
import SignInButton from '../signin';
import SignOutButton from '../singout';
import * as routes from '../../constants/routes';
import { connect } from 'react-redux';
import './index.scss';

const mapStateToProps = (state) => {
  return { authUser: state.sessionState.authUser };
};

const Navigation = ({authUser}) => {
  console.log('authUser2=', authUser)
  return (  
    <div>
      {
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </div>
  )
}

const NavigationAuth = () =>
  <div className="navbar">
    <Link to={routes.HOMEPAGE}>Home</Link>
    <LoadButton />
    <SaveButton />
    <SignOutButton />
  </div>

const NavigationNonAuth = () =>
  <div className="navbar">
    <Link to={routes.HOMEPAGE}>Home</Link>
    <SignInButton />
  </div>



export default connect(mapStateToProps)(Navigation);
