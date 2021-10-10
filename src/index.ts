import {sieveInt, sieveIntStart} from './sieve';
import {stopWhen} from './utils';

export {stopWhen, maxPrime} from './utils';
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

/**
 * Stops a number/bigint iterator, after producing 'total' number of values.
 */
export function stopOnCount<T>(iterator: IterableIterator<T>, total: number): IterableIterator<T> {
    return stopWhen(iterator, (value: T, index: number) => index === total);
}

/**
 * Stops a number/bigint iterator, upon exceeding a maximum value.
 */
export function stopOnValue<T>(iterator: IterableIterator<T>, maxValue: T): IterableIterator<T> {
    return stopWhen(iterator, (value: T) => value > maxValue);
}
