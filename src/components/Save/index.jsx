import React from 'react';
import { connect } from 'react-redux';
import { path } from 'ramda';
import PropTypes from 'prop-types';
import { db } from '../../firebase';
import AlertDialogue from '../Alert';

const mapStateToProps = state => (
  {
    authUser: state.sessionState.authUser,
    formValues: path(['form', 'selectingFormValues', 'values'], state),
  }
);

const SaveButton = ({ authUser, formValues }) => (
  <AlertDialogue
    buttonTitle="Save"
    dialogueText="Are you sure you wish to save?"
    dialogueButtons={[
      { text: 'Cancel', type: 'secondary' },
      { text: 'Confirm', onClick: () => db.saveUserFormData(authUser.uid, formValues), type: 'primary' },
    ]}
  />
);

SaveButton.defaultProps = {
  formValues: {},
  authUser: {},
};

SaveButton.propTypes = {
  authUser: PropTypes.object,
  formValues: PropTypes.object,
};

export default connect(mapStateToProps)(SaveButton);
