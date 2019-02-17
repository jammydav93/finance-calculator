import { auth, provider } from './firebase';

export const doSignOut = () => auth.signOut();

export const doGoogleSignIn = () => {
  auth.signInWithRedirect(provider).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`errorCode=${errorCode} errorMessage=${errorMessage}`);
  });
};
