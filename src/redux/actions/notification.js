const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

export const addNotification = payload => (
  {
    type: ADD_NOTIFICATION,
    payload,
  }
);

export const clearNotification = payload => (
  {
    type: CLEAR_NOTIFICATION,
    payload,
  }
);
