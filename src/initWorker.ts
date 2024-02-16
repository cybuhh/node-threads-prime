import { Worker } from 'worker_threads';

const workerPath =
  process.env.NODE_ENV && ['development', 'test'].includes(process.env.NODE_ENV)
    ? ['-r', 'ts-node/register/transpile-only']
    : undefined;

const initWorker = async (start: number, range: number) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(require.resolve('./worker'), { workerData: { start, range }, execArgv: workerPath });
    let primes: Array<number> = [];

    worker.on('error', reject);
    worker.on('exit', () => resolve(primes));
    worker.on('message', (msg) => {
      primes = primes.concat(msg);
    });
  });
};

export default initWorker;
