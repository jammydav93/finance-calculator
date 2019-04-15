import { pathOr } from 'ramda';
import { db } from './firebase';
import store from '../redux/store';
import {
  addLoadedFormData,
  addNotification,
} from '../redux/actions';

export const saveUserFormData = async (user, data) => {
  db.ref(`users/${user}`).set({
    projector: { form: JSON.stringify(data) },
  })
    .then(() => {
      store.dispatch(addNotification({ level: 'success', message: 'Data saved' }));
    })
    .catch((error) => {
      addNotification({ level: 'error', message: 'Failed to save' });
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(`errorCode=${errorCode} errorMessage=${errorMessage}`);
    });


  // TODO add failed to save message
};

export const loadFormData = async (user) => {
  store.dispatch({ type: 'START_LOADING_USER_DATA' });

  try {
    const rawResult = await db.ref(`users/${user}`).once('value');
    const result = rawResult.val();
    const formData = JSON.parse(pathOr(null, ['projector', 'form'], result));

    store.dispatch({ type: 'END_LOADING_USER_DATA' });

    if (formData) {
      store.dispatch(addLoadedFormData(formData));

      store.dispatch(addNotification({ level: 'success', message: 'Data loaded' }));
    }
  } catch (error) {
    addNotification({ level: 'error', message: 'Failed to load' });
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`errorCode=${errorCode} errorMessage=${errorMessage}`);
  }

  // TODO add nothing to load message
};
