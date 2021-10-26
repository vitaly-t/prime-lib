import {sieveIntBoost} from './soe-generators';

/**
 * Maximum cache size that can be specified. It equals to the
 * maximum number of primes with gap <= 255, to fit into a byte.
 */
export const maxCacheSize = 23_163_298;

/**
 * Primes cache array, returned from cacheArray function.
 */
export interface IPrimesArray extends Iterable<number> {
    readonly [index: number]: number;

    readonly length: number;
}

/**
 * Creates a compressed cache of prime gaps, so primes can be quickly calculated
 * and accessed, while consuming only 1/8th of memory, compared to number-s.
 *
 * Access to primes is very fast, especially with for-of iteration. For index-based
 * access it uses an optimized list of segments, for faster value calculation.
 */
export function cachePrimes(n: number): IPrimesArray {
    const step = Math.floor(7 * Math.log(n)); // optimum segment size
    const length = Math.min(n, maxCacheSize);
    const segmentLength = Math.floor(length / step);
    const gaps = new Uint8Array(length - segmentLength);
    const segments = new Uint32Array(segmentLength);
    const t = sieveIntBoost(length);
    let a = 0, i = 0, g = 0, k = 0, s = 1;
    while (i++ < length) {
        const v = t.next().value;
        if (s++ === step) {
            segments[k++] = v;
            s = 1;
        } else {
            gaps[g++] = v - a;
        }
        a = v;
    }
    const obj = {
        length,
        [Symbol.iterator](): Iterator<number> {
            let i = 0, g = 0, k = 0, s = 1, value = 0;
            return {
                next(): IteratorResult<number> {
                    if (i++ === length) {
                        return {value: undefined, done: true};
                    }
                    if (s++ === step) {
                        value = segments[k++];
                        s = 1;
                    } else {
                        value += gaps[g++];
                    }
                    return {value};
                }
            };
        }
    };
    return new Proxy<IPrimesArray>(obj, {
        get: (target: any, prop: string | symbol) => {
            const idx = typeof prop === 'string' ? Number(prop) : NaN;
            if (idx < 0 || idx >= length) {
                return;
            }
            if (idx >= 0) {
                const s = step - 1;
                let a = 0, start = 0, end = idx + 1;
                if (idx >= s) {
                    const k = Math.floor((idx - s) / step);
                    a = segments[k];
                    start = (k + 1) * s;
                    end = idx - k;
                }
                for (let i = start; i < end; i++) {
                    a += gaps[i];
                }
                return a;
            }
            return target[prop];
        }
    });
}
