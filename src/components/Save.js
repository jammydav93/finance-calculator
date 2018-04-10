import React from 'react';
import { db } from '../firebase';
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return { authUser: state.sessionState.authUser };
};

const SaveButton = ({ authUser }) =>
  <div>
    <button
      type="button"
      onClick={() => {
        console.log('saving ', authUser.uid);
        db.doCreateUser(authUser.uid, 'test')
      }}
    >
      Save
    </button>

  </div>

export default connect(mapStateToProps)(SaveButton);
