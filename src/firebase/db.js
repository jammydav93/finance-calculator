import { db } from './firebase';
import store from '../redux/store';
import { addLoadedFormData } from '../redux/actions/index';

export const saveUserFormData = async (user, data) => {
  await db.ref(`users/${user}`).set({
    projector: { form: JSON.stringify(data) },
  });
};

export const loadFormData = async (user) => {
  store.dispatch({ type: 'LOAD_USER_DATA' });

  const rawResult = await db.ref(`users/${user}`).once('value');
  const result = JSON.parse(rawResult.val().projector.form);

  if (result) {
    await store.dispatch(addLoadedFormData({
      result,
    }));
  }
};
