import { generatePrimesOnWorkers, generatePrimes } from '../src/primes';
import { checkPrimeSync as isPrime } from 'node:crypto';

jest.setTimeout(1e7);

describe('primes', () => {
  describe('should return correct lenght of results list with correct values for given parameters:', () => {
    // Actual counts taken from https://en.m.wikipedia.org/wiki/Prime-counting_function
    it.concurrent.each`
   max    | count
   ${599} | ${109}
   ${1e3} | ${168}
   ${1e4} | ${1229}
   ${1e5} | ${9592}
  `('min=2 max=$max', async ({ max, count }) => {
      const MIN = 2;
      const primeNumbers = await generatePrimesOnWorkers(MIN, max);

      expect(primeNumbers).toHaveLength(count);
      primeNumbers.forEach((primeNumber) => {
        const result = isPrime(BigInt(primeNumber));
        expect(result).toBe(true);
      });
    });
  });

  it('should have give the same result as single-threaded', async () => {
    const MIN = 2;
    const MAX = 1e7;
    const COUNT = 664579;

    const primeNumbersSingle = generatePrimes(MIN, MAX);
    expect(primeNumbersSingle).toHaveLength(COUNT);

    const primeNumbersThreaded = await generatePrimesOnWorkers(MIN, MAX);

    expect(primeNumbersThreaded).toHaveLength(primeNumbersSingle.length);
    const diff = primeNumbersThreaded.filter((val) => !primeNumbersSingle.includes(val));
    expect(diff).toHaveLength(0);
  });
});
