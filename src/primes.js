const { cpus } = require('os');
const initWorker = require('./initWorker');

const MIN = 2;

function generatePrimes(start, range) {
  const primes = [];

  let isPrime = true;
  let end = start + range;

  for (let i = start; i < end; i++) {
    for (let j = MIN; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      primes.push(i);
    }

    isPrime = true;
  }

  return primes;
}

async function generatePrimesOnWorkers(min, range) {
  const threadCount = cpus().length;
  const end = min + range;
  const rangePerThread = Math.ceil(range / threadCount);

  const workers = [...Array(threadCount).keys()].map((idx) => {
    const curStart = rangePerThread * idx + min;
    const workerRange = idx < threadCount - 1 ? rangePerThread : end - curStart;
    return initWorker(curStart, workerRange);
  });

  const primes = await Promise.all(workers);
  return primes.flat();
}

module.exports = {
  generatePrimes,
  generatePrimesOnWorkers,
};
