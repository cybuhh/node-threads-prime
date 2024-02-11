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

export default generatePrimes;
