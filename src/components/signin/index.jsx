import React from 'react';
import {
  Button,
} from '@material-ui/core';
import { auth } from '../../firebase';

const SignInButton = () => (
  <Button variant="outlined" color="primary" onClick={auth.doGoogleSignIn}>
    Login
  </Button>
);

export default SignInButton;
