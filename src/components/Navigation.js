import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap'
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
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={routes.HOMEPAGE}>Home</Link>
      </Navbar.Brand>
    </Navbar.Header>
      <Nav>
          <LoadButton />
      </Nav>
      <Nav>
          <SaveButton />
      </Nav>
      <Nav pullRight>
          <SignOutButton />
      </Nav>
  </Navbar>;

const NavigationNonAuth = () =>
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={routes.HOMEPAGE}>Home</Link>
      </Navbar.Brand>
    </Navbar.Header>
      <Nav pullRight>
          <Link to={routes.SIGN_IN}>Sign In</Link>
      </Nav>
  </Navbar>;

export default connect(mapStateToProps)(Navigation);
