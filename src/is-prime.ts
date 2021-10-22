import {maxPrime} from './common';

const dividers = [
    0, 2, 6, 8, 12, 18, 20, 26, 30, 32, 36, 42, 48, 50, 56, 60, 62, 68, 72, 78, 86, 90, 92, 96, 98,
    102, 110, 116, 120, 126, 128, 132, 138, 140, 146, 152, 156, 158, 162, 168, 170, 176, 180, 182, 186, 188, 198, 200];

/**
 * Deterministic prime verification.
 *
 * Works for up to maxPrime.
 */
export function isPrime(x: number): boolean {
    if (isNaN(x) || x < 2 || x > maxPrime || x % 1) {
        return false;
    }
    if (x % 2 === 0) return x === 2;
    if (x % 3 === 0) return x === 3;
    if (x % 5 === 0) return x === 5;
    if (x % 7 === 0) return x === 7;
    const m = Math.sqrt(x);
    for (let i = 11; i <= m; i += 210) {
        for (const a of dividers) {
            if (x % (i + a) === 0) {
                return i + a === x;
            }
        }
    }
    return true;
}
