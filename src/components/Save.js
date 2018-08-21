import React from 'react';
import { db } from '../firebase';
import { connect } from 'react-redux';

const mapStateToProps = state => (
  {
    authUser: state.sessionState.authUser,
    selectingFormValues: state.form.selectingFormValues.values,
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
