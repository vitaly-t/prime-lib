import {sieveInt, sieveIntBoost, sieveIntStart} from './sieve';

export {stopWhen, stopOnCount, stopOnValue, maxPrime} from './utils';
export {IPrimeApprox} from './common';
export {countPrimesApprox} from './count-approx';
export {nthPrimeApprox} from './nth-prime-approx';
export {countPrimes} from './count';
export {nthPrime} from './nth-prime';
export {isPrime} from './is-prime';

/**
 * Options that can be passed into generatePrimes function.
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
     * 100mln, which at peak will use about 127MB of memory.
     *
     * If you pass in more than 100mln, only 100mln will be generated.
     *
     * This option is ignored, if 'start' option is set, because the underlying
     * algorithm can only generate primes from the beginning.
     */
    boost?: number;
}

/**
 * Prime numbers generator, based on Sieve of Eratosthenes algorithm.
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
