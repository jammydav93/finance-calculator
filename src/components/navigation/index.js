import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
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
