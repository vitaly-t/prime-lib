export function* sieveBigint(): IterableIterator<bigint> {
    yield BigInt(2);
    yield BigInt(3);
    yield BigInt(5);
    const sieve = new Map<bigint, bigint>();
    const ps = sieveBigint();
    ps.next() && ps.next();
    for (let p = BigInt(3), i = BigInt(7); true; i += BigInt(2)) {
        let s = sieve.get(i);
        if (s !== undefined) {
            sieve.delete(i);
        } else if (i < p * p) {
            yield i;
            continue;
        } else {
            s = BigInt(2) * p;
            p = ps.next().value;
        }
        let k = i + s;
        while (sieve.has(k)) {
            k += s;
        }
        sieve.set(k, s);
    }
}
