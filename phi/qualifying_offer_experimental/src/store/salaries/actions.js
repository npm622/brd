import { createActionThunk } from 'redux-thunk-actions'
import * as types from './actionTypes';
import PlayerSalaryService from '../../services/PlayerSalaryService';

const playerSalaryService = new PlayerSalaryService();

export const deleteAll = () => (dispatch) => (
  {
    type: types.SALARIES_DELETED
  }
);

// TODO: check to see if this works instead of `delete` above
// export const delete = createActionThunk( types.SALARIES_DELETED );

export const fetchAll = createActionThunk( types.SALARIES_FETCHED, playerSalaryService.fetchAll() );
