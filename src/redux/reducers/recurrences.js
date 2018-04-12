const INITIAL_STATE = {
  recurrences: null,
};

const applyRecurrences = (state, action) => ({
  ...state,
  recurrences: [...state, action.payload],
});

function recurrenceReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_RECURRENCE_STATE': {
      return applyRecurrences(state, action);
    }
    default: return state;
  }
}

export default recurrenceReducer;
