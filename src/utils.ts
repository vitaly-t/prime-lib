/**
 * Math.ceil implementation for bigint.
 * Returns ceil value of a/b
 */
export function bigCeil(a: bigint, b: bigint): bigint {
    if (a > b) {
        const div = a / b;
        const remainder = a - div * b;
        const percent = 100n * remainder / b;
        return percent < 50n ? div : div + 1n;
    }
    return a * 2n >= b ? 1n : 0n;
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
