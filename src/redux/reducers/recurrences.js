const INITIAL_STATE = {
  recurrences: null,
};

const addLoadedFormData = (state, action) => ({
  ...state,
  loadedFormData: action.payload,
});

function recurrenceReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_LOADED_FORM_DATA': {
      return addLoadedFormData(state, action);
    }
    default: return state;
  }
}

export default recurrenceReducer;
