import {sieveNumber} from './sieve-number';
import {sieveBigint} from './sieve-bigint';

export {stopOnValue, stopOnCount} from './stop';

export function* generatePrimes(start?: number): IterableIterator<number> {
    // TODO: Return a different iterator when 'start' is set
    return sieveNumber();
}

export function generateBigPrimes(start?: bigint): IterableIterator<bigint> {
    // TODO: Return a different iterator when 'start' is set
    return sieveBigint();
}
