/**
 * Maximum prime number that can be generated in JavaScript,
 * using the standard 'number' type (53-bit of integer range).
 */
export const maxPrime = 9_007_199_254_740_881;

/**
 * Math.ceil implementation for bigint.
 * Returns ceil value of a/b
 *
 * Note that we do not support negative numbers here,
 * because they are not needed in this library.
 */
export function bigCeil(a: bigint, b: bigint): bigint {
    if (a < 0 || b < 0) {
        throw new TypeError('Negative inputs are not supported');
    }
    const div = a / b;
    return a === div * b ? div : div + 1n;
}

/**
 * Returns square value of a bigint.
 */
export function bigSqrt(n: bigint): bigint {
    if (n < 9n) {
        return BigInt(Math.floor(Math.sqrt(Number(n))));
    }
    return newtonIteration(n, 1n);
}

/**
 * Implements Newton Iteration for calculating a square root.
 */
function newtonIteration(n: bigint, x0: bigint): bigint {
    const x1 = ((n / x0) + x0) >> 1n;
    if (x0 === x1 || x0 === (x1 - 1n)) {
        return x0;
    }
    return newtonIteration(n, x1);
}

/**
 * Stops an iterator when a callback condition is met.
 */
export function* stopWhen<T>(iterator: IterableIterator<T>, cb: (value: T, index: number) => boolean): IterableIterator<T> {
    let i, index = 0;
    for (; ;) {
        i = iterator.next();
        if (i.done || cb(i.value, index++)) {
            break;
        }
        yield i.value;
    }
    return i.value;
}
