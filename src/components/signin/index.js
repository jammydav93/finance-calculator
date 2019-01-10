import React from 'react';
import { auth } from '../../firebase';
import {
  Button,
} from '@material-ui/core'

const SignInButton = () =>
  <div>
    <Button variant="outlined" color="primary" onClick={auth.doGoogleSignIn}>
      Login
    </Button>
  </div>

export default SignInButton;
