import {sieveInt, sieveIntBoost, sieveIntStart} from './sieve';

export {stopWhen, stopOnCount, stopOnValue, maxPrime} from './utils';
export {isPrime} from './is-prime';

/**
 * Options that can be passed into the primes generator.
 */
export interface IPrimeOptions {
    /**
     * Start prime (inclusive), from which to generate new primes.
     */
    start?: number;

    /**
     * To ignore memory efficiency, and generate primes at maximum speed,
     * set this option to the maximum number of primes to be generated.
     *
     * This utilizes a different generator, one that pre-allocates memory,
     * based on the maximum number of primes it can ultimately generate.
     *
     * The more primes you want generated at boost speed, the more memory
     * is required to calculate those. At maximum, this option can be set to
     * 100mln, which will use about 130MB of memory.
     *
     * If you pass in more than 100mln, only 100mln will be generated.
     *
     * This option is ignored, if 'start' option is set, because the underlying
     * algorithm can only generate primes from the beginning.
     */
    boost?: number;
}

/**
 * Infinite generator of prime numbers, based on Sieve of Eratosthenes algorithm,
 * extended to support optional start prime.
 */
export function generatePrimes(options?: IPrimeOptions): IterableIterator<number> {
    const {boost = 0, start = 0} = options ?? {};
    if (start > 2) {
        return sieveIntStart(start);
    }
    if (boost >= 1) {
        return sieveIntBoost(boost);
    }
    return sieveInt();
}
