import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import sessionReducer from './session';
import recurrenceReducer from './recurrences';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  recurrencesState: recurrenceReducer,
  form: reduxFormReducer,
});

export default rootReducer;
