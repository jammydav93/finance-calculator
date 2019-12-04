import moment from 'moment';
import { pathOr } from 'ramda';
import {
  MONTHLY,
  WEEKLY,
  WEEKDAYS,
} from '../../constants/recurrences';

const initialFormData = {
  loading: false,
  startDate: moment(),
  endDate: moment().add(1, 'M').add(2, 'd'),
  initialBalance: '200',
  loadedCounter: 0,
  income: [
    {
      type: 'incoming',
      cost: '1000.00',
      costPence: 100000,
      description: 'Salary 1',
      recurrenceDate: '18',
      regularity: MONTHLY,
    },
  ],
  outcome: [
    {
      type: 'outgoing',
      cost: '500.00',
      costPence: 50000,
      description: 'Rent',
      recurrenceDate: '24',
      regularity: MONTHLY,
    },
    {
      type: 'outgoing',
      cost: '60.00',
      costPence: 6000,
      description: 'Food',
      recurrenceDate: '1',
      regularity: WEEKLY,
    },
    {
      type: 'outgoing',
      cost: '10.00',
      costPence: 1000,
      description: 'Train to work',
      regularity: WEEKDAYS,
    },
  ],
};

const INITIAL_STATE = {
  formData: initialFormData,
};

const addLoadedFormData = (state, action) => {
  const { income, outcome } = action.payload;
  const incrementedLoadedCounter = pathOr(0, ['formData', 'loadedCounter'], state) + 1;
  const formData = {
    ...initialFormData,
    initialBalance: null,
    income,
    outcome,
    loadedCounter: incrementedLoadedCounter,
  };

  return {
    ...state,
    formData,
  };
};

const startLoadUserData = state => ({
  ...state,
  loading: true,
});

const endLoadUserData = state => ({
  ...state,
  loading: false,
});

const clearFormData = () => INITIAL_STATE;

function recurrenceReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'START_LOADING_USER_DATA':
      return startLoadUserData();
    case 'END_LOADING_USER_DATA':
      return endLoadUserData();
    case 'CLEAR_FORM_DATA':
      return clearFormData();
    case 'ADD_LOADED_FORM_DATA':
      return addLoadedFormData(state, action);
    default:
      return state;
  }
}

export default recurrenceReducer;
