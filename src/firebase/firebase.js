const firebase = require('firebase');
const secrets = require('../secrets.json');

const config = {
  apiKey: secrets.firebase.apiKey,
  authDomain: secrets.firebase.authDomain,
  databaseURL: secrets.firebase.databaseURL,
  storageBucket: secrets.firebase.storageBucket
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();

export {
  auth,
  db,
};
