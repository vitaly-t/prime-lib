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

export function cachePrimes(size: number): IPrimesArray {
    const step = 5; // segment step: 4 elements + 1 segment
    const length = Math.min(size, maxCacheSize);
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
            a = 0;
            i = 0;
            g = 0;
            k = 0;
            s = 1;
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
            if (typeof prop === 'symbol') {
                return target[Symbol.iterator];
            }
            if (prop >= 0) {
                prop = Number(prop);
                let a = 0, k = 0;
                if (prop >= step - 1) {
                    k = Math.floor((prop - 1) / (step - 1)); //4-8:=>0
                    // k = prop / (step - 1);
                    a = segments[k];
                }
                if (!prop) {
                    return gaps[0];
                }
                const start = k * (step - 1);
                const end = prop - k;
                for (let i = start; i <= end; i++) {
                    a += gaps[i];
                }
                return a;
            }
            if (prop === 'length') {
                return length;
            }
            throw new TypeError(`Invalid property ${JSON.stringify(prop)}`);
        }
    });
}

const r = cachePrimes(10);

console.log(r[8]);

/*
for (let i = 0; i < r.length; i++) {
    console.log(r[i]);
}*/
