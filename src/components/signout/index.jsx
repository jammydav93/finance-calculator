import React from 'react';
import { auth } from '../../firebase';
import AlertDialogue from '../alert';

const SignOutButton = () => (
  <AlertDialogue
    buttonTitle="Sign out"
    dialogueText="Are you sure you wish to sign out? Any unsaved changes will be lost."
    dialogueButtons={[
      { text: 'Cancel', type: 'secondary' },
      { text: 'Confirm', onClick: auth.doSignOut, type: 'primary' },
    ]}
  />
);

export default SignOutButton;
