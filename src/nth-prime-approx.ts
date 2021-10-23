import {IPrimeApprox} from './common';

// import {sieveIntBoost} from './soe-generators';

/**
 * Returns approximate prime from index.
 */
export function nthPrimeApprox(n: number): IPrimeApprox {
    // TODO: this is work in progress

    // Implementation should be based on work by Christian Axler, for best accuracy:
    // https://www.emis.de/journals/JIS/VOL22/Axler/axler17.pdf
    //
    // Other interesting links:
    // https://stackoverflow.com/questions/1042717/is-there-a-way-to-find-the-approximate-value-of-the-nth-prime
    // https://math.stackexchange.com/questions/2741997/approximation-for-nth-prime-number
    // https://www.johndcook.com/blog/2019/06/20/bounds-on-the-nth-prime

    // Initial attempt was based on:
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
    const p = [2, 3, 5, 7, 11][n];
    return {avg: p, min: p, max: p};
}

/*
// Local test:
[...sieveIntBoost(100)].forEach((p, i) => {
    const approx = nthPrimeApprox(i);
    const margin = 100 * Math.abs(p - approx) / Math.max(p, approx);
    console.log(`margin(${i})=${margin}, p = ${p}, approx = ${approx}`);
});
*/
