import {sieveIntBoost} from './soe-generators';

/**
 * Maximum cache size that can be specified. It is equal to the
 * maximum number of primes with gap <= 255, to fit into a byte.
 */
export const maxCacheSize = 23_163_298;

export interface IPrimesArray extends Iterable<number> {
    readonly [index: number]: number;

    readonly length: number;
}

/**
 * Creates a compressed cache of prime gaps, so primes can be quickly calculated
 * and accessed, while consuming only 1/8th of memory, compared to number-s.
 */
export function cachePrimes(n: number): IPrimesArray {
    const step = Math.floor(7 * Math.log(n)); // page/segment size
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
            let a = 0, i = 0, g = 0, k = 0, s = 1;
            return {
                next(): IteratorResult<number> {
                    if (i++ === length) {
                        return {value: undefined, done: true};
                    }
                    if (s++ === step) {
                        a = segments[k++];
                        s = 1;
                    } else {
                        a += gaps[g++];
                    }
                    return {value: a, done: false};
                }
            };
        }
    };
    return new Proxy<IPrimesArray>(obj, {
        get: (target: IPrimesArray, prop: any) => {
            const idx = typeof prop === 'string' ? Number(prop) : -1;
            if (idx >= 0) {
                let a = 0, start = 0, end = idx + 1;
                if (idx >= step - 1) {
                    const k = Math.floor((idx + 1 - step) / step);
                    a = segments[k];
                    start = (k + 1) * (step - 1);
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
