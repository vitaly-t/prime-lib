export function* sieveBigint(): IterableIterator<bigint> {
    yield 2n;
    yield 3n;
    yield 5n;
    const sieve = new Map<bigint, bigint>();
    const ps = sieveBigint();
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
