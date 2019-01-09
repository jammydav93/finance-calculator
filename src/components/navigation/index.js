import React from 'react';
import LoadButton from '../load';
import SaveButton from '../save';
import SignInButton from '../signin';
import SignOutButton from '../singout';
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
    <LoadButton />
    <SaveButton />
    <SignOutButton />
  </div>

const NavigationNonAuth = () =>
  <div className="navbar">
    <SignInButton />
  </div>



export default connect(mapStateToProps)(Navigation);
