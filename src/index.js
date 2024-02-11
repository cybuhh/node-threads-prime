const generatePrimesOnWorkers = require('./generatePrimesOnWorkers');
const generatePrimes = require('./generatePrimes');

const MIN = 2;
const MAX = 10e7;

(async function main() {
  console.time('single');
  const single = generatePrimes(MIN, MAX);
  console.timeEnd('single');

  console.time('workers');
  const threaded = await generatePrimesOnWorkers(MIN, MAX);
  console.timeEnd('workers');

  console.log('Prime single is:  ', single.join(' '));
  console.log('Prime threaded is:', threaded.join(' '));
})();
