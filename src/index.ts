import {sieveInt, sieveIntStart, sieveBigInt, sieveBigIntStart} from './sieve';

export {stopWhen, stopOnCount, stopOnValue} from './stop';
export {isPrime} from './is-prime';

export function generatePrimes(start?: number): IterableIterator<number> {
    return start && start > 2 ? sieveIntStart(start) : sieveInt();
}

export function generateBigPrimes(start?: bigint): IterableIterator<bigint> {
    return start && start > 2n ? sieveBigIntStart(start) : sieveBigInt();
}
