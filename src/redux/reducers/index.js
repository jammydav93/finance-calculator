import { combineReducers } from 'redux';
import sessionReducer from './session';
import recurrenceReducer from './recurrences';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  recurrencesState: recurrenceReducer,
});

export default rootReducer;
