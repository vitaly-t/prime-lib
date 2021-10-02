export function isPrime(value: number | bigint): boolean {
    switch (typeof value) {
        case 'number':
            return isPrimeNumber(value);
        case 'bigint':
            return isBigPrime(value);
        default:
            return false;
    }
}

export function isPrimeNumber(n: number): boolean {
    if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) {
        return false;
    }
    if (n % 2 === 0) return n === 2;
    if (n % 3 === 0) return n === 3;
    if (n % 5 === 0) return n === 5;
    const m = Math.sqrt(n);
    for (let i = 7; i <= m; i += 30) {
        if (n % i === 0) return i === n;
        if (n % (i + 4) === 0) return i + 4 === n;
        if (n % (i + 6) === 0) return i + 6 === n;
        if (n % (i + 10) === 0) return i + 10 === n;
        if (n % (i + 12) === 0) return i + 12 === n;
        if (n % (i + 16) === 0) return i + 16 === n;
        if (n % (i + 22) === 0) return i + 22 === n;
        if (n % (i + 24) === 0) return i + 24 === n;
    }
    return true;
}

// Interesting also: npm i bigint-is-prime
// https://github.com/shade/BigJS/blob/master/src/bigint.js
// those are probability-based check for bigint primes.
export function isBigPrime(n: bigint) {
    if (n % 1n || n < 2n) {
        return false;
    }
    if (n % 2n === 0n) return n === 2n;
    if (n % 3n === 0n) return n === 3n;
    if (n % 5n === 0n) return n === 5n;

    const m = newtonIteration(n, 1n);

    for (let i = 7n; i <= m; i += 30n) {
        if (n % i === 0n) return i === n;
        if (n % (i + 4n) === 0n) return i + 4n === n;
        if (n % (i + 6n) === 0n) return i + 6n === n;
        if (n % (i + 10n) === 0n) return i + 10n === n;
        if (n % (i + 12n) === 0n) return i + 12n === n;
        if (n % (i + 16n) === 0n) return i + 16n === n;
        if (n % (i + 22n) === 0n) return i + 22n === n;
        if (n % (i + 24n) === 0n) return i + 24n === n;
    }
    return true;
}

function newtonIteration(n: bigint, x0: bigint): bigint {
    const x1 = ((n / x0) + x0) >> 1n;
    if (x0 === x1 || x0 === (x1 - 1n)) {
        return x0;
    }
    return newtonIteration(n, x1);
}
