import React from 'react';
import { db } from '../../firebase';
import { connect } from 'react-redux';
import { path } from 'ramda';
import AlertDialogue from '../alert'

const mapStateToProps = state => (
  {
    authUser: state.sessionState.authUser,
    selectingFormValues: path(['form', 'selectingFormValues', 'values'], state),
  }
);

const SaveButton = ({ authUser, selectingFormValues }) =>
  <AlertDialogue 
    buttonTitle='Save'
    dialogueText='Are you sure you wish to save?'
    dialogueButtons={[
      { text: 'Cancel', type: 'secondary'},
      { text: 'Confirm', onClick: () => db.saveUserFormData(authUser.uid, selectingFormValues), type: 'primary'},
    ]}
  />

export default connect(mapStateToProps)(SaveButton);
