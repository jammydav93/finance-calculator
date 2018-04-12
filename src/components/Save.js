import React from 'react';
import { db } from '../firebase';
import { connect } from 'react-redux';


const mapStateToProps = state => (
  {
    authUser: state.sessionState.authUser,
    recurrencesObject: state.recurrencesState,
  }
);

const SaveButton = ({ authUser, recurrencesObject }) => (
  <div>
    <button
      type="button"
      onClick={() => {
        console.log('saving ', authUser.uid, recurrencesObject);
        db.doCreateUser(authUser.uid, recurrencesObject)
      }}
    >
      Save
    </button>
  </div>
);

export default connect(mapStateToProps)(SaveButton);
