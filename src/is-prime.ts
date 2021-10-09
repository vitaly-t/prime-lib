import {maxPrime} from './utils';

const primeDividers = [
    0, 2, 6, 8, 12, 18, 20, 26, 30, 32, 36, 42, 48, 50, 56, 60, 62, 68, 72, 78, 86, 90, 92, 96, 98,
    102, 110, 116, 120, 126, 128, 132, 138, 140, 146, 152, 156, 158, 162, 168, 170, 176, 180, 182, 186, 188, 198, 200];

/**
 * Optimized prime-number verification.
 */
export function isPrime(n: number): boolean {
    if (isNaN(n) || n < 2 || n > maxPrime || n % 1) {
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
