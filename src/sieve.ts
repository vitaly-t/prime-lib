/**
 * Highly optimized, postponed Sieve of Eratosthenes algorithm.
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
        } else if (i < p * p) {
            yield i;
            continue;
        } else {
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
 * Highly optimized, postponed Sieve of Eratosthenes algorithm,
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
    const sieve = new Map();
    const ps = sieveIntStart(2);
    ps.next();                 // skip the 2
    let p = ps.next().value;   // p === 3
    let pSqr = p * p;          // p^2, 9
    let c = pSqr;              // first candidate, 9
    let s = 6;                 // step value

    while (pSqr < start)      // must adjust initial state
    {
        s = 2 * p;
        let m = p + s * Math.ceil((start - p) / s);  // multiple of p
        while (sieve.has(m)) m += s;
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
    for (; true; c += 2)     // main loop
    {
        s = sieve.get(c);
        if (s !== undefined) {
            sieve.delete(c);      // c composite
        } else if (c < pSqr) {
            yield c;              // c prime
            continue;
        } else {                  // c == p^2
            s = 2 * p;
            p = ps.next().value;
            pSqr = p * p;
        }
        let m = c + s;
        while (sieve.has(m)) m += s;
        sieve.set(m, s);
    }
}

/**
 * Highly optimized, postponed Sieve of Eratosthenes algorithm for bigint type.
 */
export function* sieveBigInt(): IterableIterator<bigint> {
    yield 2n;
    yield 3n;
    yield 5n;
    const sieve = new Map();
    const ps = sieveBigInt();
    ps.next() && ps.next();
    for (let p = 3n, i = 7n; true; i += 2n) {
        let s = sieve.get(i);
        if (s !== undefined) {
            sieve.delete(i);
        } else if (i < p * p) {
            yield i;
            continue;
        } else {
            s = 2n * p;
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
 * Highly optimized, postponed Sieve of Eratosthenes algorithm for bigint-s,
 * and extended for 'start' logic.
 */
export function* sieveBigIntStart(start: bigint): IterableIterator<bigint> {
    if (start <= 2n) {
        yield 2n;
    }
    if (start <= 3n) {
        yield 3n;
    }
    if (start <= 5n) {
        yield 5n;
    }
    if (start <= 7n) {
        yield 7n;
    }
    const sieve = new Map();
    const ps = sieveBigIntStart(2n);
    ps.next();                 // skip the 2
    let p: bigint = ps.next().value;   // p === 3
    let pSqr = p * p;          // p^2, 9
    let c = pSqr;              // first candidate, 9
    let s = 6n;                // step value

    while (pSqr < start)       // must adjust initial state
    {
        s = 2n * p;
        let m = p + s * bigCeil((start - p), s);  // multiple of p
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
    if (c % 2n === 0n) {
        c += 1n;
    }

    for (; true; c += 2n)     // main loop
    {
        s = sieve.get(c)!;
        if (s !== undefined) {
            sieve.delete(c);      // c composite
        } else if (c < pSqr) {
            yield c;              // c prime
            continue;
        } else {                  // c == p^2
            s = 2n * p;
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

export function bigCeil(a: bigint, b: bigint): bigint {
    if (a > b) {
        const div = a / b;
        const remainder = a - div * b;
        const percent = 100n * remainder / b;
        return percent < 50n ? div : div + 1n;
    }
    return a * 2n >= b ? 1n : 0n;
}
