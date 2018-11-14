import moment from 'moment';

const initialFormData = {
  startDate: moment(),
  endDate: moment().add(1, 'M'),
  initialBalance: null, 
};

const INITIAL_STATE = {
  formData: initialFormData
};

const addLoadedFormData = (state, action) => {
  const { income, outcome } = action.payload.result
  
  const formData = { ...initialFormData, income, outcome }

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
