import moment from 'moment';

const initialFormData = {
  startDate: moment(),
  endDate: moment().add(1, 'M'),
  initialBalance: null,
  loadedCounter: 0,
};

const INITIAL_STATE = {
  formData: initialFormData
};

const addLoadedFormData = (state, action) => {
  const { income, outcome } = action.payload.result
  const incrementedLoadedCounter = state.formData.loadedCounter + 1
  const formData = { 
    ...initialFormData,
    income,
    outcome,
    loadedCounter: incrementedLoadedCounter
  }

  return {
    ...state,
    formData,
  };
}

const clearFormData = () => INITIAL_STATE

function recurrenceReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'CLEAR_FORM_DATA':
      return clearFormData()
    case 'ADD_LOADED_FORM_DATA':
      return addLoadedFormData(state, action)
    default:
      return state
  }
}

export default recurrenceReducer;
