import React from 'react';
import { db } from '../firebase';
import PropTypes from 'prop-types';

const SaveButton = (props, { authUser }) =>
  <div>
    <button
      type="button"
      onClick={() => db.doCreateUser(this.context.authUser.uid, props.data)}
    >
      Save
    </button>

  </div>

  SaveButton.contextTypes = {
    authUser: PropTypes.object,
  };



export default SaveButton;
