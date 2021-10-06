import {sieveInt, sieveIntStart, sieveBigInt, sieveBigIntStart} from './sieve';
import {stopWhen} from './utils';

export {stopWhen, maxPrime} from './utils';
export {isPrime} from './is-prime';

/**
 * Infinite generator of prime numbers, based on Sieve of Eratosthenes algorithm,
 * extended to support optional start prime.
 */
export function generatePrimes(start?: number): IterableIterator<number> {
    return start && start > 2 ? sieveIntStart(start) : sieveInt();
}

/**
 * Infinite generator of BigInt prime numbers, based on Sieve of Eratosthenes algorithm,
 * extended to support optional start prime.
 */
export function generateBigPrimes(start?: bigint): IterableIterator<bigint> {
    return start && start > 2n ? sieveBigIntStart(start) : sieveBigInt();
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
