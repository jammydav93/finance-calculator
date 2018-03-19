import React from 'react';
import { auth, db } from '../firebase';
import PropTypes from 'prop-types';

export function saveToDb(authUser, data) {
  console.log('saving...');
  db.doCreateUser(authUser.uid, data);
}

const SaveButton = (props, { authUser }) =>
  <div>
    <button
      type="button"
      onClick={() => { saveToDb(authUser, props.data) }}


    >
      Save
    </button>

  </div>

  SaveButton.contextTypes = {
    authUser: PropTypes.object,
  };



export default SaveButton;
