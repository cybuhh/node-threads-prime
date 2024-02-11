const { parentPort, workerData } = require('worker_threads');
const generatePrimes = require('./generatePrimes');

if (!parentPort) {
  return;
}

const primes = generatePrimes(workerData.start, workerData.range);
parentPort.postMessage(primes);
