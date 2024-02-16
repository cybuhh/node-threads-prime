import { parentPort, workerData } from 'worker_threads';
import { generatePrimes } from './primes';

if (parentPort) {
  const primes = generatePrimes(workerData.start, workerData.range);
  parentPort.postMessage(primes);
}
