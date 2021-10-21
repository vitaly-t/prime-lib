// by Ovinus Real
// from: https://stackoverflow.com/questions/43432760/looking-for-a-fast-prime-counting-function

// TODO: This is all work in progress.

function eratosthenesWithPi(n: number): { primes: Uint32Array, pi: Uint32Array } {
    const array = [], upperLimit = Math.sqrt(n), output = [];
    const pi = [0, 0];

    // TODO: move to Uint32 bitmask here
    for (let i = 0; i < n; i++) {
        array.push(true);
    }

    for (let i = 2; i <= upperLimit; i++) {
        if (array[i]) {
            for (let j = i * i; j < n; j += i) {
                array[j] = false;
            }
        }
    }

    let cnt = 0;

    for (let i = 2; i < n; i++) {
        if (array[i]) {
            output.push(i);
            cnt++;
        }
        pi.push(cnt);
    }

    return {primes: new Uint32Array(output), pi: new Uint32Array(pi)};
}

const phiMemo: number[] = [];
let primes = new Uint32Array();

function Phi(m: number, b: number): number {
    if (b === 0 || m === 0) {
        return m;
    }
    if (m >= 800) {
        return Phi(m, b - 1) - Phi(Math.floor(m / primes[b - 1]), b - 1);
    }
    const t = b * 800 + m;
    if (!phiMemo[t]) {
        phiMemo[t] = Phi(m, b - 1) - Phi(Math.floor(m / primes[b - 1]), b - 1);
    }
    return phiMemo[t];
}

const smallValues = [1, 2, 2, 3];
let piValues = new Uint32Array();

export function countPrimes(x: number): number {
    if (x < 6) {
        if (x < 2) {
            return 0;
        }
        return smallValues[x - 2];
    }
    const root2 = Math.floor(Math.sqrt(x));
    const root3 = Math.floor(x ** (1 / 3));
    const top = Math.floor(x / root3) + 1;

    if (root2 + 1 >= primes.length) {
        const res = eratosthenesWithPi(top + 2);
        primes = res.primes;
        piValues = res.pi;
    }

    const a = piValues[root3 + 1], b = piValues[root2 + 1];

    let sum = 0;

    for (let i = a; i < b; ++i) {
        const p = primes[i];
        sum += piValues[Math.floor(x / p)] - piValues[p] + 1;
    }

    return Phi(x, a) + a - 1 - sum;
}

/*
{x: 1e9, count: 50_847_534},
{x: 1e10, count: 455_052_511},
{x: 1e11, count: 4_118_054_813}
*/

/*
const start = Date.now();
const result = countPrimes(1.999);
console.log(`Duration: ${Date.now() - start}, result: ${result.toLocaleString()}`);
*/
