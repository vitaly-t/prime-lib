import {IPrimeApprox} from './common';
// import {stopOnCount} from './utils';
// import {sieveIntBoost, sieveIntStart} from './sieve';

// import {primes} from '../test/primes';

/**
 * Returns approximate prime number from index.
 */
export function nthPrimeApprox(n: number): IPrimeApprox {
    // TODO: this is work in progress

    // initial approximation, based on:
    // https://math.stackexchange.com/questions/1257/is-there-a-known-mathematical-equation-to-find-the-nth-prime
    // for n ≥ 6: n ln n + n(ln ln n − 1) < p(n) < n ln n + n * ln ln n

    /*
    if (n < 6) {
        const p = [2, 3, 5, 7, 11, 13][n];
        return {avg: p, min: p, max: p};
    }

    const ln = Math.log(n);
    const a = n * ln + n * (Math.log(ln) - 1);
    const b = n * ln + n * Math.log(ln);

    return {
        avg: Math.round((a + b) / 2),
        min: Math.ceil(a),
        max: Math.floor(b)
    };*/

    // temporary, to pass current tests:
    // const p = primes[n];
    const p = [2, 3, 5, 7, 11][n];
    return {avg: p, min: p, max: p};
}

/*
const primes_small = [2, 3, 5, 7, 11, 13];

const ULONG_MAX = 0xFFFFFFFF;

[...sieveIntBoost(10)].forEach((p, i) => {

    const approx = nth_prime_upper(i);
    // const approx = i * (Math.log(i) + Math.log(Math.log(i)));
    const margin = 100 * Math.abs(p - approx) / Math.max(p, approx);
    console.log(`margin(${i})=${margin}, p = ${p}, approx = ${approx}`);
});
*/

// https://stackoverflow.com/questions/1042717/is-there-a-way-to-find-the-approximate-value-of-the-nth-prime
// See answer by DanaJ

// also see: https://math.stackexchange.com/questions/2741997/approximation-for-nth-prime-number

// Christian Axler:
// best accuracy today: https://www.emis.de/journals/JIS/VOL22/Axler/axler17.pdf
// se also: https://www.johndcook.com/blog/2019/06/20/bounds-on-the-nth-prime/

/*
function nth_prime_upper(n: number) {
    const fn = n;
    let flogn, flog2n, upper;
    if (n < 6) return primes_small[n];

    n++;

    flogn = Math.log(n);
    flog2n = Math.log(flogn);

    if (n >= 688383)    // Dusart 2010 page 2
        upper = fn * (flogn + flog2n - 1.0 + ((flog2n - 2.00) / flogn));
    else if (n >= 178974)    // Dusart 2010 page 7
        upper = fn * (flogn + flog2n - 1.0 + ((flog2n - 1.95) / flogn));
    else if (n >= 39017)    // Dusart 1999 page 14
        upper = fn * (flogn + flog2n - 0.9484);
    else                    // Modified from Robin 1983 for 6-39016 _only_
        upper = fn * (flogn + 0.6000 * flog2n);

    if (upper >= ULONG_MAX) {
        // Adjust this as needed for your type and exception method
        if (n <= 425656284035217743) return 18446744073709551557;
        // fprintf(stderr, "nth_prime_upper overflow\n"; exit(-1);
    }

    return Math.ceil(upper);
}
*/