import React from 'react';
import { connect } from 'react-redux';
import { path } from 'ramda';
import PropTypes from 'prop-types';
import { db } from '../../firebase';
import AlertDialogue from '../Alert';

const mapStateToProps = state => (
  {
    authUser: state.sessionState.authUser,
    selectingFormValues: path(['form', 'selectingFormValues', 'values'], state),
  }
);

const SaveButton = ({ authUser, selectingFormValues }) => (
  <AlertDialogue
    buttonTitle="Save"
    dialogueText="Are you sure you wish to save?"
    dialogueButtons={[
      { text: 'Cancel', type: 'secondary' },
      { text: 'Confirm', onClick: () => db.saveUserFormData(authUser.uid, selectingFormValues), type: 'primary' },
    ]}
  />
);

SaveButton.propTypes = {
  authUser: PropTypes.object.isRequired,
  selectingFormValues: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(SaveButton);
