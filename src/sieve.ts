/**
 * Sieve of Eratosthenes (SoE) generators.
 */

import {maxPrime} from './utils';

/**
 * Optimized, Postponed SoE algorithm.
 *
 * This implementation is based on the answer by Will Ness:
 * https://stackoverflow.com/questions/2211990/how-to-implement-an-efficient-infinite-generator-of-prime-numbers-in-python/10733621
 */
export function* sieveInt(): IterableIterator<number> {
    yield 2;
    yield 3;
    yield 5;
    yield 7;
    const sieve = new Map();
    const ps = sieveInt();
    ps.next() && ps.next();
    for (let p = 3, i = 9; true; i += 2) {
        let s = sieve.get(i);
        if (s !== undefined) {
            sieve.delete(i);
        } else {
            if (i < p * p) {
                yield i;
                continue;
            }
            s = 2 * p;
            p = ps.next().value;
        }
        let k = i + s;
        while (sieve.has(k)) {
            k += s;
        }
        sieve.set(k, s);
    }
}

/**
 * Optimized, Postponed SoE algorithm, extended for 'start' logic.
 *
 * This implementation is based on the answer by Will Ness:
 * https://stackoverflow.com/questions/69336435/postponed-sieve-algorithm-with-start-logic/69345662
 */
export function* sieveIntStart(start: number): IterableIterator<number> {
    if (start <= 2) {
        yield 2;
    }
    if (start <= 3) {
        yield 3;
    }
    if (start <= 5) {
        yield 5;
    }
    if (start <= 7) {
        yield 7;
    }
    if (start >= maxPrime) {
        if (start === maxPrime) {
            yield maxPrime;
        }
        return;
    }
    const sieve = new Map();
    const ps = sieveIntStart(2);
    ps.next();
    let p = ps.next().value;
    let pSqr = p * p;
    let c = pSqr;
    let s = 6;

    while (pSqr < start) {
        s = 2 * p;
        let m = p + s * Math.ceil((start - p) / s);
        while (sieve.has(m)) {
            m += s;
        }
        sieve.set(m, s);
        p = ps.next().value;
        pSqr = p * p;
    }
    if (start > c) {
        c = start;
    }
    if (c % 2 === 0) {
        c += 1;
    }
    for (; true; c += 2) {
        s = sieve.get(c);
        if (s !== undefined) {
            sieve.delete(c);
        } else {
            if (c < pSqr) {
                yield c;
                if (c === maxPrime) {
                    return;
                }
                continue;
            }
            s = 2 * p;
            p = ps.next().value;
            pSqr = p * p;
        }
        let m = c + s;
        while (sieve.has(m)) {
            m += s;
        }
        sieve.set(m, s);
    }
}

/**
 * Maximum number of primes for which we can allocate memory to boost performance.
 *
 * To generate quickly 100mln primes we will be allocating about 130MB of RAM.
 * Going beyond that will likely overload any browser or NodeJS client.
 *
 * Also, the current implementation is limited by a sub-32-bit range, capable of
 * producing about 103mln primes, which we round down to 100mln, for simplicity.
 */
const maxLimit = 100_000_000;

export function* sieveIntBoost(n: number): IterableIterator<number> {
    const maxCount = n > maxLimit ? maxLimit : n;
    const bufferLimit = Math.floor(2.3 * maxCount * (Math.log10(maxCount) + 1));
    yield 2;
    const gen = sieveOddPrimesTo(bufferLimit);
    let p, count = 0;
    while (++count < maxCount && (p = gen())) {
        yield p;
    }
}

/**
 * The following SoE implementation is based on work by GordonBGood:
 *  - https://stackoverflow.com/users/549617/gordonbgood
 *  - https://github.com/GordonBGood
 *
 * See "Chapter 2 - Bit Packing and Odds Only Wheel Factorization" in his answer here:
 * https://stackoverflow.com/questions/39312107/implementing-the-page-segmented-sieve-of-eratosthenes-in-javascript/55761023
 *
 * The algorithm is limited by a sub-32-bit range here, capable of producing about 103mln primes.
 * And simple extension of the bits range here wouldn't help much, because it will eat too much
 * memory (for a JavaScript client).
 */
function sieveOddPrimesTo(bufferLimit: number): (() => number | void) {
    const lmti = (bufferLimit - 3) >> 1;
    const sz = (lmti >> 3) + 1;
    const cmpSts = new Uint8Array(sz);
    for (let i = 0; ; ++i) {
        const p = i + i + 3;
        const sqri = (i << 1) * (i + 3) + 3;
        if (sqri > lmti) {
            break;
        }
        if ((cmpSts[i >> 3] & ((1 >>> 0) << (i & 7))) === 0 >>> 0) {
            for (let c = sqri; c <= lmti; c += p) {
                cmpSts[c >> 3] |= (1 >>> 0) << (c & 7);
            }
        }
    }
    let bi = -1;
    return () => {
        if (bi < 0) {
            ++bi;
        }
        while (bi <= lmti && (cmpSts[bi >> 3] & ((1 >>> 0) << (bi & 7))) !== 0 >>> 0) {
            ++bi;
        }
        /* istanbul ignore else */
        if (bi <= lmti) {
            return (bi++ << 1) + 3;
        }
        // else may occur only if the last prime sits at the very end of the buffer,
        // which is hypothetically possible, but we exclude this from test coverage.
    };
}
