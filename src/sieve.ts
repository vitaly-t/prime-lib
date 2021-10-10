/**
 * CREDITS
 *
 * Many thanks to Will Ness, who implemented most of the algorithms used in this file.
 *
 * See:
 *   - https://stackoverflow.com/users/849891/will-ness
 *   - https://stackoverflow.com/questions/69336435/postponed-sieve-algorithm-with-start-logic
 */

import {maxPrime} from './utils';

/**
 * Optimized, postponed Sieve of Eratosthenes algorithm.
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
 * Optimized, postponed Sieve of Eratosthenes algorithm,
 * extended for 'start' logic.
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
