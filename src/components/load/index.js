import React from 'react';
import { db } from '../../firebase';
import { connect } from 'react-redux';
import AlertDialogue from '../alert'

const mapStateToProps = state => {
  return { authUser: state.sessionState.authUser };
};

const LoadButtonConnected = ({ authUser }) =>
  <AlertDialogue 
    buttonTitle='Load'
    dialogueText='Are you sure you wish to load? Any unsaved changes will be lost.'
    dialogueButtons={[
      { text: 'Cancel', type: 'secondary'},
      { text: 'Confirm', onClick: () => db.loadFormData(authUser.uid), type: 'primary'},
    ]}
  />

const LoadButton = connect(mapStateToProps)(LoadButtonConnected);

export default LoadButton;
