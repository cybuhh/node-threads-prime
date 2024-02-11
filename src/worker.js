import { parentPort, workerData } from 'worker_threads';
import generatePrimes from './generatePrimes.js';

if (parentPort) {
  const primes = generatePrimes(workerData.start, workerData.range);
  parentPort.postMessage(primes);
}
