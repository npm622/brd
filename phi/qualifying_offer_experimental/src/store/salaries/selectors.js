import { createSelector } from 'reselect'

export const getSalaries = (state) => state.salaries;
export const getQualifyingOfferThreshold = (state) => state.qualifyingOfferThreshold;

export const getAvailableSalaries = createSelector(
  getSalaries,
  (salaries) => salaries.filter(salary => salary.salary)
);

export const getMissingSalaries = createSelector(
  getSalaries,
  (salaries) => salaries.filter(salary => !salary.salary).map(salary => salary.player)
);

export const getSalaryBuckets = createSelector(
  getAvailableSalaries,
  (salaries) => {
    const buckets = {};
    for (let i= 0; i < salaries.length; i++) {
      const { salary } = salaries[i];

      if (!buckets[salary]) {
        buckets[salary] = 0;
      }
      buckets[salary]++;
    }
    return buckets;
  }
);

export const getChartData = createSelector(
  getSalaryBuckets,
  (buckets) => {
    return Object.keys(buckets)
        .filter(key => buckets.hasOwnProperty(key))
        .map(key => ({
          x: key,
          y: buckets[key]
        }));
  }
);
