import { db } from './firebase';
import store from '../redux/store';
import { addRecurrences } from '../redux/actions/index';

export const doCreateUser = async (user, data) => {
  const path = 'users2/' + user;
  await db.ref(path).set({
    data,
  });
  console.log('saved: ', data);
}

export const getUser = async (user) => {
  console.log('loading user...', user);
  const path = 'users2/' + user;
  const raw_result = await db.ref(path).once('value');

  console.log('rawres=', raw_result.val());

  if (raw_result.val()) {
    const {
      incomes,
      outgoings,
      initBalance,
      startDate,
      endDate,
    } = raw_result.val().data.recurrences[0];

    await store.dispatch(addRecurrences({
      incomes,
      outgoings,
      initBalance,
      startDate,
      endDate,
    }));
  }
};
