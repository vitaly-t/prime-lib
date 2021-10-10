import {sieveInt, sieveIntStart} from './sieve';

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
     * Ignore memory efficiency, and generate primes at maximum performance.
     *
     * TODO: This hasn't been implemented yet.
     */
    // boost?: boolean;
}

/**
 * Infinite generator of prime numbers, based on Sieve of Eratosthenes algorithm,
 * extended to support optional start prime.
 */
export function generatePrimes(options?: IPrimeOptions): IterableIterator<number> {
    const start = options?.start ?? 0;
    return start > 2 ? sieveIntStart(start) : sieveInt();
}
