import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoadButton from './Load';
import SaveButton from './Save';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = (props, { authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth data={props.data}/>
        : <NavigationNonAuth />
    }
  </div>

  Navigation.contextTypes = {
    authUser: PropTypes.object,
  };

const NavigationAuth = (props) =>
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><LoadButton/></li>
    <li><SaveButton data={props.data}/></li>
    <li><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
  </ul>

export default Navigation;
