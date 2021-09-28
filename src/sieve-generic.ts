import {stopOnCount} from './stop';

const sieveNumbers = {
    start: [2, 3, 5],
    a: 3,
    b: 7,
    c: 2
};

const sieveBigInt = {
    start: [2n, 3n, 5n],
    a: 3n,
    b: 7n,
    c: 2n
};

export function sieve_Number(): IterableIterator<number> {
    return sieveGeneric(sieveNumbers);
}

export function sieve_BigInt(): IterableIterator<bigint> {
    return sieveGeneric(sieveBigInt);
}

function* sieveGeneric<T>(params: any): IterableIterator<T> {
    yield params.start[0];
    yield params.start[1];
    yield params.start[2];
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

console.log('result:', [...stopOnCount(sieve_Number(), 10)]);
