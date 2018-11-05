const firebase = require('firebase');
const prodConfig = require('./prod-config.json');
const ppeConfig = require('./ppe-config.json');

//Firebase config is not sensitive ()
const importedConfig = process.env.NODE_ENV === 'production' ? prodConfig : ppeConfig

const config = {
  apiKey: importedConfig.firebase.apiKey,
  authDomain: importedConfig.firebase.authDomain,
  databaseURL: importedConfig.firebase.databaseURL,
  storageBucket: importedConfig.firebase.storageBucket
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.database();

export {
  auth,
  db,
  provider,
};
