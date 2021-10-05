import {bigSqrt} from './utils';

/**
 * Verifies if number/bigint is a prime.
 */
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

const primeDividers = [
    0, 2, 6, 8, 12, 18, 20, 26, 30, 32, 36, 42, 48, 50, 56, 60, 62, 68, 72, 78, 86, 90, 92, 96, 98,
    102, 110, 116, 120, 126, 128, 132, 138, 140, 146, 152, 156, 158, 162, 168, 170, 176, 180, 182, 186, 188, 198, 200];

const bigPrimeDividers = primeDividers.map(BigInt);

/**
 * Highly-optimized prime-number verification.
 *
 * Source: http://www.javascripter.net/faq/numberisprime.htm
 */
function isPrimeNumber(n: number): boolean {
    if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) {
        return false;
    }
    if (n % 2 === 0) return n === 2;
    if (n % 3 === 0) return n === 3;
    if (n % 5 === 0) return n === 5;
    if (n % 7 === 0) return n === 7;
    const m = Math.sqrt(n);
    for (let i = 11; i <= m; i += 210) {
        for (const a of primeDividers) {
            if (n % (i + a) === 0) {
                return i + a === n;
            }
        }
    }
    return true;
}

/**
 * Highly-optimized prime-bigint verification.
 */
function isBigPrime(n: bigint) {
    if (n % 1n || n < 2n) {
        return false;
    }
    if (n % 2n === 0n) return n === 2n;
    if (n % 3n === 0n) return n === 3n;
    if (n % 5n === 0n) return n === 5n;
    if (n % 7n === 0n) return n === 7n;
    const m = bigSqrt(n);
    for (let i = 11n; i <= m; i += 210n) {
        for (const a of bigPrimeDividers) {
            if (n % (i + a) === 0n) {
                return i + a === n;
            }
        }
    }
    return true;
}
