/**
 * Maximum number of primes for which the gap is less or equal 255,
 * to be stored as a single byte.
 */
import {sieveIntBoost} from './soe-generators';

const maxCacheSize = 23_163_298;

export interface IPrimesArray extends Iterable<number> {
    readonly [index: number]: number;

    readonly length: number;
}

export function cachePrimes(size: number): IPrimesArray {
    const length = Math.min(size, maxCacheSize);
    const cache = new Uint8Array(length);
    const i = sieveIntBoost(length);
    let a, k = 0;
    while (!(a = i.next()).done) {
        cache[k++] = a.value;
    }
    const scope = {
        length,
        [Symbol.iterator](): Iterator<number> {
            let i = 0;
            return {
                next(): IteratorResult<number> {
                    if (i++ < length) {
                        return {value: cache[i - 1], done: false};
                    }
                    return {value: undefined, done: true};
                }
            };
        }
    };
    // return scope;
    return new Proxy<IPrimesArray>(scope, {
        get: (target: IPrimesArray, prop: any) => {
            if (typeof prop === 'symbol') {
                return scope[Symbol.iterator];
            }
            return cache[prop];
        }
    });
}

const c = cachePrimes(5);

const r: number = c[2];
// console.log(r);


for (const a of c) {
    console.log(r, a);
}
