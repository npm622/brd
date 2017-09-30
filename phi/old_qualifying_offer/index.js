const request = require('request'),
  cheerio = require('cheerio');

const DATA_URL = 'https://questionnaire-148920.appspot.com/swe/';

request(DATA_URL, (err, res, html) => {
  if (err) {
    console.log(`unexpected error occurred: ${JSON.stringify(err)}`);
    process.exit(1)
  }

  const result = {
    datasetThreshold: 125,
    datasetSize: 0,
    playersWithNoSalaryData: [],
    playerSalaries: [],
    salaryFrequencies: {}
  };

  const $ = cheerio.load(html);
  $('#salaries-table').find('tbody').children().each((idx, elem) => {
    const tr = $(elem);

    const name = tr.find('.player-name').text();
    const currency = tr.children('.player-salary').text();

    const player = parseNameString(name)
    const salary = parseCurrencyString(currency);

    result.datasetSize++;
    if (salary === 0) {
      result.playersWithNoSalaryData.push(player);
    } else {
      result.playerSalaries.push({ player, salary })
    }
  }).get();

  sortSalaries(result.playerSalaries);
  sortPlayers(result.playersWithNoSalaryData);

  result.qualifyingOffer = calculateQualifyingOffer(result.playerSalaries, result.datasetThreshold);
  result.salaryFrequencies = curateSalaryFrequencies(result.playerSalaries);

  result.playerSalaries.forEach(playerSalary => console.log(playerSalary));
  console.log("\n~~~~    no data    ~~~~");
  result.playersWithNoSalaryData.forEach(player => console.log(player));
  console.log("\n~~~~    qualifying offer    ~~~~");
  console.log(result.qualifyingOffer);
  console.log("\n~~~~    salary frequencies    ~~~~");
  console.log(result.salaryFrequencies)
});

// ======= qualifying offer calculation =======

const calculateQualifyingOffer = (playerSalaries, threshold) => {
  if (!playerSalaries) {
    console.log(`failed to provide any player salaries; unable to calculate a qualifying offer`);
    process.exit(1);
  }

  if (playerSalaries.length < threshold) {
    console.log(`failed to provide enough player salaries to calculate a qualifying offer; need ${threshold} but received ${playerSalaries.length}`);
    process.exit(1);
  }

  let totalSalary = 0;
  playerSalaries.slice(0, threshold)
      .forEach( playerSalary => totalSalary += playerSalary.salary);

  return totalSalary / threshold;
}

// ======= salary frequencies =======

const curateSalaryFrequencies = (playerSalaries) => {
  const freqs = {};

  if (!playerSalaries) {
    return freqs;
  }

  for (let i = 0; i < playerSalaries.length; i++) {
    const { player, salary } = playerSalaries[i];

    if (!freqs[salary.toString()]) {
      freqs[salary.toString()] = [];
    }
    freqs[salary.toString()].push(player);
  }

  return freqs;
}

// ======= raw value parsing =======

const parseNameString = (name) => {
  [ first, last ] = name.split(', ');
  return { first, last }
};

// h/t: https://stackoverflow.com/questions/559112/how-to-convert-a-currency-string-to-a-double-with-jquery-or-javascript
const parseCurrencyString = (salary) => Number(salary.replace(/[^0-9\.-]+/g, ''));

// ======= player sorting by salary =======

const sortSalaries = (playerSalaries, isAscending) => {
  playerSalaries.sort((o1, o2) => {
    const { salary: s1 } = o1;
    const { salary: s2 } = o2;

    return isAscending ? s1 - s2 : s2 - s1
  });
}

// ======= player sorting by name =======

const sortPlayers = (players, isAscending) => {
  players.sort((o1, o2) => {
    const { first: f1, last: l1 } = o1;
    const { first: f2, last: l2 } = o2;

    const compareLastNames = compareString(l1, l2, isAscending);
    if (compareLastNames !== 0) {
      return compareLastNames;
    }
    return compareString(f1, f2, isAscending);
  });
}

const compareString = (s1, s2, isAscending) => {
  if (s1 < s2) {
    return isAscending ? -1 : 1;
  } else if (s1 > s2) {
    return isAscending ? 1 : -1;
  } else {
    return 0;
  }
}
