import { db } from './firebase';

// User API

export const doCreateUser = async (user, data) => {
  const path = 'users2/' + user;
  const result = await db.ref(path).set({
    data,
  });
  console.log('saved: ', result)
}

export const getUser = async (user) => {
    const path = 'users2/' + user;
    const result = await db.ref(path).once('value');
    console.log('retrieved: ', result.val());
}
