const { parentPort, workerData } = require('worker_threads');
const { generatePrimes } = require('./primes');

if (!parentPort) {
  return;
}

const primes = generatePrimes(workerData.start, workerData.range);
parentPort.postMessage(primes);
