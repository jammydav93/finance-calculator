import React from 'react';
import LoadButton from '../load';
import SaveButton from '../save';
import SignInButton from '../signin';
import SignOutButton from '../singout';
import Loading from '../loading';
import { connect } from 'react-redux';
import './index.scss';

const mapStateToProps = (state) => {
  const {
    authUser,
    loading
  } = state.sessionState

  return {
    authUser,
    loading,
  }
}

const showAuthedNavBar = (authUser) =>
  authUser ? <NavigationAuth /> : <NavigationNonAuth />

const Navigation = (props) => (
    <div className='navbar'>
      {
        props.loading ? <Loading /> : showAuthedNavBar(props.authUser)
      }
    </div>
)

const NavigationAuth = () =>
<React.Fragment>
  <div className='button'>
    <LoadButton />
  </div>
  <div className='button'>
    <SaveButton />
  </div>
  <div className='button'>
    <SignOutButton />
  </div>
</React.Fragment>

const NavigationNonAuth = () =>
  <div className='button'>
    <SignInButton />  
  </div>

export default connect(mapStateToProps)(Navigation);
