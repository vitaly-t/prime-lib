import {sieveInt, sieveIntStart, sieveBigInt, sieveBigIntStart} from './sieve';

export {stopWhen, stopOnCount, stopOnValue} from './stop';
export {isPrime} from './is-prime';

/**
 * Maximum prime number that can be generated in JavaScript,
 * using the standard 'number' type (53-bit of integer range).
 */
export const maxPrime = 9_007_199_254_740_881;

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
