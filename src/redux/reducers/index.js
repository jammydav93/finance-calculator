import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import sessionReducer from './session';
import recurrenceReducer from './recurrences';
import notificationReducer from './notification';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  recurrencesState: recurrenceReducer,
  form: reduxFormReducer,
  notification: notificationReducer,
});

export default rootReducer;
