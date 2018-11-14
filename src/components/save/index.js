import React from 'react';
import { db } from '../../firebase';
import { connect } from 'react-redux';
import { path } from 'ramda';

const mapStateToProps = state => (
  {
    authUser: state.sessionState.authUser,
    selectingFormValues: path(['form', 'selectingFormValues', 'values'], state),
  }
);

const SaveButton = ({ authUser, selectingFormValues }) => {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          console.log('saving ', authUser.uid, selectingFormValues);
          db.saveUserFormData(authUser.uid, selectingFormValues)
        }}
      >
        Save
      </button>
    </div>
  )
}

export default connect(mapStateToProps)(SaveButton);
