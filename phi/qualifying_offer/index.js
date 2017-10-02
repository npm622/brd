const program = require('commander'),
  request = require('request'),
  cheerio = require('cheerio'),
  formatCurrency = require('format-currency');

const DATA_THRESHOLD = 125;
const DATA_URL = 'https://questionnaire-148920.appspot.com/swe/';

program
  .version( '0.0.0' )
  .option( '-t, --threshold <n>', 'Specify number of top contracts to average for qualifying offer amount [ default: 125 ]', DATA_THRESHOLD, parseInt )
  .option( '-f, --frequency <n>', 'Specify number of data points to return representing a salary frequency chart (-1 for all)', DATA_THRESHOLD, parseInt )
  .option( '-r, --raw-data <n>', 'Specify number of data points to return of raw data (-1 for all)', DATA_THRESHOLD, parseInt )
  .parse( process.argv );

const { threshold, frequency, rawData } = program;
console.log(`{ threshold: ${threshold}, frequency: ${frequency}, rawData: ${rawData} }`);

console.log(`fetching player salaries from: ${DATA_URL}`);

request(DATA_URL, (err, res, html) => {
  console.log('...');
  if (err) {
    console.log(`unexpected error occurred: ${JSON.stringify(err)}`);
    process.exit(1)
  }

  const result = {
    datasetThreshold: threshold,
    datasetSize: 0,
    qualifyingOffer: undefined,
    missingSalaries: [],
    salaryBuckets: [],
    playerSalaries: []
  };

  const $ = cheerio.load(html);
  $('#salaries-table').find('tbody').children().each((idx, elem) => {
    const tr = $(elem);

    const nameString = tr.find('.player-name').text();
    const salaryString = tr.children('.player-salary').text();

    const player = parseNameString(nameString)
    const salary = parseSalaryString(salaryString);

    result.datasetSize++;
    if (!salary) {
      result.missingSalaries.push(player);
    } else {
      result.playerSalaries.push({ player, salary })
    }
  }).get();

  sortSalaries(result.playerSalaries);
  sortPlayers(result.missingSalaries);

  result.qualifyingOffer = calculateQualifyingOffer(result.playerSalaries, result.datasetThreshold);
  result.salaryBuckets = calculateSalaryBuckets(result.playerSalaries);

  console.log(`needed ${result.datasetThreshold} salaries, found ${result.datasetSize}`);
  console.log(`\n--------\nthe projected qualifying offer is: ${formatSalary(result.qualifyingOffer)}\n--------\n`);
  console.log('players with missing salaries:');
  result.missingSalaries.forEach(r => console.log(`\t- ${r.first} ${r.last}`))
  const { datasetSize } = result;

  let salaryBucketCount = 0;
  const salaryBucketLimit = Number(frequency) === -1 ? datasetSize : frequency;
  console.log(`salary frequencies (top ${salaryBucketLimit}):`);
  result.salaryBuckets
    .filter(r => {
      const shouldContinue = salaryBucketCount <= salaryBucketLimit;
      salaryBucketCount += r.occurences;
      return shouldContinue;
    })
    .forEach(r => console.log(`\t( ${formatSalary(r.salary)}, ${r.occurences} )` ));

  const rawDataLimit = Number(rawData) === -1 ? datasetSize : rawData;
  console.log(`raw salary data (top ${rawDataLimit}):`);
  result.playerSalaries
    .filter((_, i) => i < rawDataLimit)
    .forEach(r => console.log(`\t( '${r.player.first} ${r.player.last}', ${formatSalary(r.salary)} )`));
});

const opts = { format: '%s%v', symbol: '$' };
const formatSalary = (salary) => formatCurrency(salary, opts);

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

const calculateSalaryBuckets = (playerSalaries) => {
  const freqs = {};

  if (!playerSalaries) {
    return freqs;
  }

  for (let i = 0; i < playerSalaries.length; i++) {
    const { player, salary } = playerSalaries[i];

    if (salary) {
      if (!freqs[salary]) {
        freqs[salary] = 0;
      }
      freqs[salary]++;
    }
  }

  return Object.keys(freqs)
      .filter(key => freqs.hasOwnProperty(key))
      .map(key => ({ salary: key, occurences: freqs[key]}))
      .reverse();
}

// ======= raw value parsing =======

const parseNameString = (name) => {
  [ first, last ] = name.split(', ');
  return { first, last }
};

// h/t: https://stackoverflow.com/questions/559112/how-to-convert-a-currency-string-to-a-double-with-jquery-or-javascript
const parseSalaryString = (salary) => {
  const val = salary.replace(/[^0-9.-]+/g, '');

  if (val !== '') {
    return Number(val);
  }
};

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
