import { combineReducers } from 'redux';
import { fromJS } from 'immutable';
import salaries from './salaries/reducer';

export const initialState = fromJS({
  salaries: []
});

const rootReducer = combineReducers(
  { salaries },
  initialState
);

export default rootReducer;
