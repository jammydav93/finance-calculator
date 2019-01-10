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
    <div className='navbar'>
      {
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </div>
  )
}

const NavigationAuth = () =>
  <React.Fragment>
    <LoadButton />
    <SaveButton />
    <SignOutButton />
  </React.Fragment>



const NavigationNonAuth = () =>
    <SignInButton />

export default connect(mapStateToProps)(Navigation);
