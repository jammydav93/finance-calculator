import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import LoadButton from './Load';
import SaveButton from './Save';
import SignInButton from './SignIn';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';
import { connect } from 'react-redux';
import './navigation.scss';

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
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={routes.HOMEPAGE}>Home</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav pullRight>
        <NavItem>
          <SignInButton />
        </NavItem>
    </Nav>
  </Navbar>;



export default connect(mapStateToProps)(Navigation);
