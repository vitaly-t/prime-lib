/**
 * Counts primes, using a hybrid approach of Meissel Lehmer + compressed Sieve of Eratosthenes algorithms.
 */
export function countPrimes(x: number): number {
    if (x < 6) {
        if (x < 2) {
            return 0;
        }
        return [1, 2, 2, 3][x - 2];
    }
    const root2 = Math.floor(Math.sqrt(x));
    const root3 = Math.floor(x ** 0.33333);
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

/**
 * Compressed SoE calculator for primes + counters.
 */
function soeCalc(x: number): { primes: Uint32Array, pi: Uint32Array } {
    // Pierre Dusart's maximum primes: π(x) < (x/ln x)(1 + 1.2762/ln x)
    const maxPrimes = Math.ceil(x / Math.log(x) * (1 + 1.2762 / Math.log(x)));
    const primes = new Uint32Array(maxPrimes);
    const upperLimit = Math.sqrt(x);
    const bmc = Math.ceil(x / 32); // bitmask compression
    const pi = new Uint32Array(x);
    const arr = new Uint32Array(bmc);
    arr.fill(0xFFFF_FFFF);
    for (let i = 2; i <= upperLimit; i++) {
        if (arr[i >>> 5] & 1 << i % 32) {
            for (let j = i * i; j < x; j += i) {
                arr[j >>> 5] &= ~(1 << j % 32);
            }
        }
    }
    let count = 0;
    for (let i = 2; i < x; i++) {
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
            return loop(m, --b) - loop(Math.floor(m / p[b]), b);
        }
        const t = b * fts + m;
        if (!memo[t]) {
            memo[t] = loop(m, --b) - loop(Math.floor(m / p[b]), b);
        }
        return memo[t];
    }(m1, b1);
}
