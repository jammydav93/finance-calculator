import { db } from './firebase';

export const doCreateUser = async (user, data) => {
  const path = 'users2/' + user;
  await db.ref(path).set({
    data,
  });
  console.log('saved: ', data);
}

export const getUser = async (user) => {
    const path = 'users2/' + user;
    const result = await db.ref(path).once('value');
    console.log('retrieved: ', result.val());
}
