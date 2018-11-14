import React from 'react';
import { auth } from '../../firebase';

const SignInButton = () =>
  <button
    type="button"
    onClick={auth.doGoogleSignIn}
  >
    Login
  </button>

export default SignInButton;
