import {sieveIntBoost, maxBoostLimit} from './soe-generators';

/**
 * Maximum number of primes for which gap <= 255, i.e. can fit into 1 byte.
 * After that, we have to compress gaps, by storing bit 8 in bit 0,
 * using the fact that all gaps (except between 2 and 3) are even.
 */
export const maxSmallGaps = 23_163_298;

/**
 * Creates a compressed cache of prime gaps, so primes can be quickly calculated
 * and accessed, while consuming only 1/8th of memory, compared to number-s.
 *
 * Access to primes is very fast, especially with for-of iteration. For index-based
 * access it uses an optimized list of segments, for faster value calculation.
 */
export function cachePrimes(n: number): ArrayLike<number> & Iterable<number> {
    const length = Math.min(n, maxBoostLimit);
    const step = Math.floor(7 * Math.log(length)); // optimum segment size
    const segmentLength = Math.floor(length / step);
    const gaps = new Uint8Array(length - segmentLength);
    const segments = new Uint32Array(segmentLength);
    const t = sieveIntBoost(length);
    let a = 0, i = 0, g = 0, k = 0, s = 1;
    let compress = (z: number) => z;
    let decompress = (z: number) => z;
    if (length > maxSmallGaps) {
        // gaps can exceed 255, need extra compression:
        compress = (z: number) => z & 1 ? z : z & 254 | z >>> 8;
        decompress = (z: number) => z | 254 ? z & 254 | (z & 1) << 8 : z;
    }
    while (i++ < length) {
        const v = t.next().value;
        if (s++ === step) {
            segments[k++] = v;
            s = 1;
        } else {
            gaps[g++] = compress(v - a);
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
                        value += decompress(gaps[g++]);
                    }
                    return {value};
                }
            };
        }
    };
    return new Proxy(obj, {
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
                    a += decompress(gaps[i]);
                }
                return a;
            }
            return target[prop];
        }
    });
}
