import {sieveInt, sieveIntStart, sieveBigInt, sieveBigIntStart} from './sieve';

export {stopWhen, stopOnCount, stopOnValue} from './stop';
export {isPrime} from './is-prime';

/**
 * Maximum prime number that can be generated in JavaScript,
 * using the standard 'number' type (53-bit of integer range).
 */
export const maxPrime = 9_007_199_254_740_881;

export function generatePrimes(start?: number): IterableIterator<number> {
    return start && start > 2 ? sieveIntStart(start) : sieveInt();
}

export function generateBigPrimes(start?: bigint): IterableIterator<bigint> {
    return start && start > 2n ? sieveBigIntStart(start) : sieveBigInt();
}
