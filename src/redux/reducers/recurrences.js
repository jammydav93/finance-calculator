import moment from 'moment';

const initialFormData = {
  startDate: moment(),
  endDate: moment().add(1, 'M').add(2, 'd'),
  initialBalance: "200",
  loadedCounter: 0,
  income: [
    {
      type: 'incoming',
      cost: '1000.00',
      costPence: 100000,
      description: 'Salary 1',
      recurrenceDate: '18',
      regularity: 'monthly',
    }
  ],
  outcome: [
    {
      type: 'outgoing',
      cost: '500.00',
      costPence: 50000,
      description: 'Rent',
      recurrenceDate: '24',
      regularity: 'monthly',
    },
    {
      type: 'outgoing',
      cost: '60.00',
      costPence: 6000,
      description: 'Food',
      recurrenceDate: '1',
      regularity: 'weekly',
    },
    {
      type: 'outgoing',
      cost: '10.00',
      costPence: 1000,
      description: 'Train to work',
      regularity: 'weekdays',
    }
  ],
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
