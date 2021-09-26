export function* sieveNumber(): IterableIterator<number> {
    yield 2;
    yield 3;
    yield 5;
    const sieve = new Map<number, number>();
    const ps = sieveNumber();
    ps.next() && ps.next();
    for (let p = 3, i = 7; true; i += 2) {
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
