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
 * Optimized, postponed Sieve of Eratosthenes algorithm, extended for 'start' logic.
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
 * Going beyond that will overload any browser or NodeJS.
 */
const maxLimit = 100_000_000;

export function* sieveIntBoost(limit: number): IterableIterator<number> {
    const maxCount = limit > maxLimit ? maxLimit : limit;
    const bufferLimit = Math.floor(2.3 * maxCount * (Math.log10(maxCount) + 1));
    yield 2;
    const gen = sieveOddPrimesTo(bufferLimit);
    let p, count = 0;
    while (++count < maxCount && (p = gen())) {
        yield p;
    }
}

function sieveOddPrimesTo(bufferLimit: number) {
    const lmti = (bufferLimit - 3) >> 1;
    const sz = (lmti >> 3) + 1;
    const cmpSts = new Uint8Array(sz);
    for (let i = 0; ; ++i) {
        const p = i + i + 3;
        const sqri = (i << 1) * (i + 3) + 3;
        if (sqri > lmti) {
            break;
        }
        if ((cmpSts[i >> 3] & ((1 >>> 0) << (i & 7))) == 0 >>> 0) {
            for (let c = sqri; c <= lmti; c += p) {
                cmpSts[c >> 3] |= (1 >>> 0) << (c & 7);
            }
        }
    }
    let bi = -1;
    return function () {
        if (bi < 0) {
            ++bi;
        }
        while (bi <= lmti && (cmpSts[bi >> 3] & ((1 >>> 0) << (bi & 7))) != 0 >>> 0) {
            ++bi;
        }
        if (bi > lmti) {
            // this can only happen when the number of pre-generated primes
            // matches the number of requested primes exactly.
            return null;
        }
        return (bi++ << 1) + 3;
    };
}
