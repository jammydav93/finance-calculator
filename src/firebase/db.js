import { db } from './firebase';

// User API

export const doCreateUser = (user, data) => {
  console.log(JSON.stringify(data));
  db.ref(`users2/${user}`).set({
    data,
  });
}

export const onceGetUsers = () =>
  db.ref('users').once('value');
