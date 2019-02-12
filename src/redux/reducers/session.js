const INITIAL_STATE = {
  authUser: null,
  loading: true,
};

const applySetAuthUser = (state, action) => ({
  ...state,
  authUser: action.authUser,
  loading: false,
});

function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'AUTH_USER_SET': {
      return applySetAuthUser(state, action);
    }
    default: return state;
  }
}

export default sessionReducer;
