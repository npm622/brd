import * as types from './actionTypes';
import PlayerSalaryService from '../../services/PlayerSalaryService';

const playerSalaryService = new PlayerSalaryService();

export const fetchPlayerSalaries = () => (
  (dispatch) => (
    playerSalaryService.fetchAll()
        .then(playerSalaries => dispatch({ type: types.SALARIES_FETCHED, payload: playerSalaries }))
        .catch(error => console.error(error))
  )
);
