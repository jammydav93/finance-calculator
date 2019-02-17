import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { db } from '../../firebase';
import AlertDialogue from '../alert';

const mapStateToProps = state => ({ authUser: state.sessionState.authUser });

const LoadButtonConnected = ({ authUser }) => (
  <AlertDialogue
    buttonTitle="Load"
    dialogueText="Are you sure you wish to load? Any unsaved changes will be lost."
    dialogueButtons={[
      { text: 'Cancel', type: 'secondary' },
      { text: 'Confirm', onClick: () => db.loadFormData(authUser.uid), type: 'primary' },
    ]}
  />
);

LoadButtonConnected.propTypes = {
  authUser: PropTypes.object.isRequired,
};

const LoadButton = connect(mapStateToProps)(LoadButtonConnected);

export default LoadButton;
