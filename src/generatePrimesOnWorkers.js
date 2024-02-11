import { Worker } from 'worker_threads';
import { cpus } from 'os';
import path from 'path';
import { getDirname } from './utils.js';

const workerPath = path.resolve(getDirname(import.meta.url), 'worker');

const initWorker = async (start, range) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, { workerData: { start, range } });
    let primes = [];

    worker.on('error', reject);
    worker.on('exit', () => resolve(primes));
    worker.on('message', (msg) => {
      primes = primes.concat(msg);
    });
  });
};

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

export default generatePrimesOnWorkers;
