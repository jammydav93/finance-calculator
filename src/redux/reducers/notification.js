const INITIAL_STATE = {
  level: 'warning',
  message: 'this is a warning',
};

const addNotification = ({ level, message }) => ({
  level,
  message,
});

const clearNotification = () => ({
  level: null,
  message: null,
});

function notificationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return addNotification(action.payload);
    case 'CLEAR_NOTIFICATION':
      return clearNotification();
    default:
      return state;
  }
}

export default notificationReducer;
