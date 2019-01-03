import React from 'react';
import { db } from '../../firebase';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { authUser: state.sessionState.authUser };
};

const LoadButtonConnected = ({ authUser }) =>
  <button
    type="button"
    onClick={() => {
      db.loadFormData(authUser.uid);
    }}
  >
    Load
  </button>

const LoadButton = connect(mapStateToProps)(LoadButtonConnected);

export default LoadButton;
