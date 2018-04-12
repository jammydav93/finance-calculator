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
    const path = 'users2/' + user;
    const raw_result = await db.ref(path).once('value');
    const {
      allRecurrences,
      initBalance,
      startDate,
      endDate,
    } = raw_result.val().data.recurrences[0];

    store.dispatch(
      addRecurrences({
        allRecurrences,
        initBalance,
        startDate,
        endDate,
      })
    );
}
