const { Worker } = require('worker_threads');

const initWorker = async (start, range) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./src/worker', { workerData: { start, range } });
    let primes = [];

    worker.on('error', reject);
    worker.on('exit', () => resolve(primes));
    worker.on('message', (msg) => {
      primes = primes.concat(msg);
    });
  });
};

module.exports = initWorker;
