import * as types from './actionTypes';

const initialState = {
  list: []
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case types.SALARIES_FETCHED:
      return Object.assign({}, state, { list: payload });
    default:
      return Object.assign({}, state);
  }
}

// selectors

export const getPlayerSalaries = ({ salaries }) => {
  return salaries.list
      .filter(playerSalary => playerSalary.salary); // TODO: rename `state.salaries` to `state.playerSalaries`
}

export const getSalaryBuckets = ({ salaries }) => {
  const buckets = {};
  for (let i = 0; i < salaries.list.length; i++) {
    const { player, salary } = salaries.list[i];

    if (salary) {
      if (!buckets[salary.toString()]) {
        buckets[salary.toString()] = [];
      }
      buckets[salary.toString()].push(player);
    }
  }
  return buckets;
}

export const getUnavailableSalaries = ({ salaries }) => {
  return salaries.list
      .filter(salary => salary.salary)
      .map(playerSalary => playerSalary.player);
}
