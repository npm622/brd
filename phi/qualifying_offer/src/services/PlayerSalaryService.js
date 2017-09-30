import Promise from 'bluebird';
import request from 'request';
import cheerio from 'cheerio';

export const DATASET_URI = 'http://localhost:3000/swe/';

class PlayerSalaryService {

  fetchAll() {
    return new Promise((resolve, reject) => {

      request(DATASET_URI, (err, res, html) => {

        if (err) {
          return reject(err);
        }

        const $ = cheerio.load(html);

        const playerSalaries = $('#salaries-table')
            .find('tbody')
            .children()
            .map((idx, elem) => {
              const tr = $(elem);

              const nameString = tr.find('.player-name').text();
              const salaryString = tr.children('.player-salary').text();

              return {
                player: parseNameString(nameString),
                salary: parseSalaryString(salaryString)
              };
            })
            .get()

        return resolve(playerSalaries);
      });
    });
  }
};

const parseNameString = (name) => {
  const [ first, last ] = name.split(', ');
  return { first, last }
};

const parseSalaryString = (salary) => {
  const val = salary.replace(/[^0-9.-]+/g, '');

  if (val !== '') {
    return Number(val);
  }
};

export default PlayerSalaryService;
