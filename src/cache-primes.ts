import {sieveIntBoost, maxBoostLimit} from './soe-generators';

/**
 * Return type from cachePrimes function.
 */
export interface IPrimesCache extends Iterable<number>, ArrayLike<number> {
    /**
     * Fast prime accessor from index. It is 100 times faster than via Proxy.
     */
    readonly fastIndex: {
        /**
         * Returns prime from index, if the latter is within the range.
         */
        get(index: number): number | undefined;

        /**
         * Number of primes in the cache.
         */
        readonly length: number;
    };
}

/**
 * Maximum number of primes for which gap <= 255, i.e. can fit into 1 byte.
 * After that, we have to compress gaps, by storing bit 8 in bit 0,
 * using the fact that all gaps (except between 2 and 3) are even.
 *
 * We make the distinction, because compression costs ~10% of performance.
 */
export const maxSmallGaps = 23_163_298;

/**
 * Creates a compressed cache of prime gaps, so primes can be quickly calculated
 * and accessed, while consuming only 1/8th of memory, compared to number-s.
 *
 * Access to primes is very fast, especially with for-of iteration. For index-based
 * access it uses an optimized list of segments, for faster value calculation.
 *
 * Maximum cache size is for 100mln primes.
 */
export function cachePrimes(n: number): IPrimesCache {
    const length = Math.min(n, maxBoostLimit);
    const huge = length > maxSmallGaps;
    const step = Math.floor(7 * Math.log(length)); // optimum segment size
    const segmentLength = Math.floor(length / step);
    const gaps = new Uint8Array(length - segmentLength);
    const segments = new Uint32Array(segmentLength);
    const t = sieveIntBoost(length);
    let a = 0, i = 0, g = 0, k = 0, s = 1;

    // compression is for when gaps can exceed 255:
    const compress = (z: number) => z & 1 ? z : z & 254 | z >>> 8;
    const decompress = (z: number) => z & 254 ? z & 254 | (z & 1) << 8 : z;

    while (i++ < length) {
        const v = t.next().value;
        if (s++ === step) {
            segments[k++] = v;
            s = 1;
        } else {
            gaps[g++] = huge ? compress(v - a) : v - a;
        }
        a = v;
    }

    const last = {
        index: 0,
        value: 0
    };

    const obj: IPrimesCache = {
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
                        value += huge ? decompress(gaps[g++]) : gaps[g++];
                    }
                    return {value, done: false};
                }
            };
        },
        fastIndex: {
            length,
            get(index: number): number | undefined {
                if (index >= 0 && index < length) {
                    const s = step - 1;
                    let a = 0, start = 0, end = index + 1;
                    if (index >= s) {
                        const k = ~~((index - s) / step);
                        a = segments[k];
                        start = (k + 1) * s;
                        end = index - k;
                    }
                    if (index === last.index + 1) {
                        if (end > start) {
                            last.value += huge ? decompress(gaps[end - 1]) : gaps[end - 1];
                        } else {
                            last.value = a;
                        }
                        last.index++;
                        return last.value;
                    }
                    for (let i = start; i < end; i++) {
                        a += huge ? decompress(gaps[i]) : gaps[i];
                    }
                    last.value = a;
                    last.index = index;
                    return a;
                }
            }
        }
    };

    return new Proxy<IPrimesCache>(obj, {
        get: (target: any, prop: string | symbol) => {
            const idx = typeof prop === 'string' ? +prop : NaN;
            if (Number.isInteger(idx)) {
                return obj.fastIndex.get(idx);
            }
            return target[prop];
        }
    });
}
