// by Ovinus Real
// from: https://stackoverflow.com/questions/43432760/looking-for-a-fast-prime-counting-function

import {countPrimesApprox} from './count-approx';

function soeCalc(n: number): { primes: Uint32Array, pi: Uint32Array } {
    const primes = new Uint32Array(countPrimesApprox(n).max);
    const upperLimit = Math.sqrt(n);
    const top = Math.ceil(n / 32);
    const arr = new Uint32Array(top);
    const pi = new Uint32Array(n);
    for (let i = 0; i < top; i++) {
        arr[i] = 0xFFFF_FFFF;
    }
    for (let i = 2; i <= upperLimit; i++) {
        if (arr[i >>> 5] & 1 << i % 32) {
            for (let j = i * i; j < n; j += i) {
                arr[j >>> 5] &= ~(1 << j % 32);
            }
        }
    }
    let count = 0;
    for (let i = 2; i < n; i++) {
        if (arr[i >>> 5] & 1 << i % 32) {
            primes[count] = i;
            count++;
        }
        pi[i] = count;
    }
    return {primes, pi};
}

function Phi(m1: number, b1: number, p: Uint32Array): number {
    const fts = 800; // factorial table size
    const maxMem = b1 * fts + Math.min(m1, fts) + 1;
    const memo = new Uint16Array(maxMem);
    return function loop(m: number, b: number): number {
        if (b === 0 || m === 0) {
            return m;
        }
        if (m >= fts) {
            return loop(m, b - 1) - loop(Math.floor(m / p[b - 1]), b - 1);
        }
        const t = b * fts + m;
        if (!memo[t]) {
            memo[t] = loop(m, b - 1) - loop(Math.floor(m / p[b - 1]), b - 1);
        }
        return memo[t];
    }(m1, b1);
}

export function countPrimes(x: number): number {
    if (x < 6) {
        if (x < 2) {
            return 0;
        }
        return [1, 2, 2, 3][x - 2];
    }
    const root2 = Math.floor(Math.sqrt(x));
    const root3 = Math.floor(x ** (1 / 3));
    const top = Math.floor(x / root3) + 1;
    const {primes, pi} = soeCalc(top + 2);
    const a = pi[root3 + 1], b = pi[root2 + 1];
    let sum = 0;
    for (let i = a; i < b; ++i) {
        const p = primes[i];
        sum += pi[Math.floor(x / p)] - pi[p] + 1;
    }
    return Phi(x, a, primes) + a - 1 - sum;
}

/*
{x: 1e9, count: 50_847_534},
{x: 1e10, count: 455_052_511},
{x: 1e11, count: 4_118_054_813}
*/

// 2370ms is a fantastic result for 1e11! :)
// dropped to 1934ms, after stared using Uint8Array
// dropped to 1530ms, after changing pi to pre-allocated array

/*
const start = Date.now();
const result = countPrimes(1e11);
console.log(`Duration: ${Date.now() - start}, result: ${result.toLocaleString()}`);
*/