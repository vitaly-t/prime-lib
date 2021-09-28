import {stopOnCount} from './stop';

function* primesFrom(start: number): IterableIterator<number> {
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
    const ps = primesFrom(2);
    ps.next();                 // skip the 2
    let p = ps.next().value;   // p==3
    let psqr = p * p;          // p^2, 9
    let c = psqr;              // first candidate, 9
    let s = 6;                 // step value

    while (psqr < start)      // must adjust initial state
    {
        s = 2 * p;
        let m = p + s * Math.ceil((start - p) / s);  // multiple of p
        while (sieve.has(m)) m += s;
        sieve.set(m, s);
        p = ps.next().value;
        psqr = p * p;
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
        } else if (c < psqr) {
            yield c;              // c prime
            continue;
        } else {                  // c == p^2
            s = 2 * p;
            p = ps.next().value;
            psqr = p * p;
        }
        let m = c + s;
        while (sieve.has(m)) m += s;
        sieve.set(m, s);
    }
}

console.log([...stopOnCount(primesFrom(200), 10)]);

// TODO: Math.ceil for bigint