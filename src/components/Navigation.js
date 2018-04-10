import React from 'react';
import { Link } from 'react-router-dom';
import LoadButton from './Load';
import SaveButton from './Save';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { authUser: state.sessionState.authUser, };
};

const Navigation = ({authUser}) => {
  console.log('authUser2=', authUser)
  return (  <div>
      {
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </div> )
}


const NavigationAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><LoadButton /></li>
    <li><SaveButton /></li>
    <li><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
  </ul>

export default connect(mapStateToProps)(Navigation);
