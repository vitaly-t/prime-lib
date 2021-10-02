const sieveNumbers = {
    start: [2, 3, 5, 7],
    a: 3,
    b: 9,
    c: 2
};

const sieveBigInt = {
    start: sieveNumbers.start.map(BigInt),
    a: BigInt(sieveNumbers.a),
    b: BigInt(sieveNumbers.b),
    c: BigInt(sieveNumbers.c)
};

export function sieve_Number(): IterableIterator<number> {
    return sieveGeneric(sieveNumbers);
}

export function sieve_BigInt(): IterableIterator<bigint> {
    return sieveGeneric(sieveBigInt);
}

function* sieveGeneric<T>(params: any): IterableIterator<T> {
    for (const a of params.start) {
        yield a;
    }
    const sieve = new Map<number, number>();
    const ps = sieveGeneric(params);
    ps.next() && ps.next();
    for (let p = params.a, i = params.b; true; i += params.c) {
        let s = sieve.get(i);
        if (s !== undefined) {
            sieve.delete(i);
        } else if (i < p * p) {
            yield i;
            continue;
        } else {
            s = params.c * p;
            p = ps.next().value;
        }
        let k = i + s;
        while (sieve.has(k)) {
            k += s;
        }
        sieve.set(k, s);
    }
}
