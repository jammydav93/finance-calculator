import { db } from './firebase';
import store from '../redux/store';
import { addLoadedFormData } from '../redux/actions/index';

export const saveUserFormData = async (user, data) => {
  await db.ref(`users/${user}`).set({
    projector: { form: JSON.stringify(data) }
  });
}

export const getUserFormData = async (user) => {
  console.log('loading user...', user);
  const raw_result = await db.ref(`users/${user}`).once('value');
  const result = JSON.parse(raw_result.val().projector.form)

  if (result) {
    await store.dispatch(addLoadedFormData({
      result,
    }));
  }
};
