import { auth, provider } from './firebase';
import { addNotification } from '../redux/actions';

export const doSignOut = () => auth.signOut()
  .then(() => {
    addNotification({ level: 'success', message: 'you have been signed out' });
  })
  .catch((error) => {
    addNotification({ level: 'error', message: 'Failed to sign out' });
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`errorCode=${errorCode} errorMessage=${errorMessage}`);
  });

export const doGoogleSignIn = () => {
  auth.signInWithRedirect(provider)
    .catch((error) => {
      addNotification({ level: 'error', message: 'Failed to sign in' });
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(`errorCode=${errorCode} errorMessage=${errorMessage}`);
    });
};
