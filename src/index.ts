import {sieveInt, sieveIntStart, sieveBigInt, sieveBigIntStart} from './sieve';

export {maxPrime} from './sieve';
export {isPrime} from './is-prime';
export {stopWhen, stopOnCount, stopOnValue} from './stop';

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
