import React from 'react';
import { auth } from '../../firebase';
import {
  Button,
} from '@material-ui/core'

const SignInButton = () =>
  <Button variant="outlined" color="primary" onClick={auth.doGoogleSignIn}>
    Login
  </Button>

export default SignInButton;
