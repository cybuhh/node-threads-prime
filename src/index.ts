import { generatePrimesOnWorkers, generatePrimes } from './primes';

(async function main() {
  const min = 2;
  const max = 10e7;

  console.time('single');
  const single = generatePrimes(min, max);
  console.timeEnd('single');

  console.time('workers');
  const threaded = await generatePrimesOnWorkers(min, max);
  console.timeEnd('workers');

  console.log('Primes single result is:  ', single.join(' '));
  console.log('Primes threaded result is:', threaded.join(' '));
})();
