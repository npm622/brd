import { fromJS, List } from 'immutable'
import * as types from './actionTypes';

export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SALARIES_DELETED_SUCCEEDED:
      return state.set('salaries', List())
    case types.SALARIES_FETCHED_SUCCEEDED:
      return state.mergeDeep(fromJS(payload));
    default:
      return state;
  }
}
