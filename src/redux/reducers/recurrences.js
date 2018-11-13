const INITIAL_STATE = {};

const addLoadedFormData = (state, action) => {
  const { income, outcome } = action.payload.result
  
  const formData = { income, outcome }

  return {
    ...state,
    formData,
  };
}

function recurrenceReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_LOADED_FORM_DATA': {
      return addLoadedFormData(state, action);
    }
    default: return state;
  }
}

export default recurrenceReducer;
