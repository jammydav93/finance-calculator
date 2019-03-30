import React from 'react';
import {
  Button,
} from '@material-ui/core';
import { auth } from '../../firebase';

const SignInButton = () => (
  <Button color="inherit" onClick={auth.doGoogleSignIn}>
    Login
  </Button>
);

export default SignInButton;
