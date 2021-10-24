import {IPrimeApprox} from './common';

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

    if (n < 6) {
        const p = [2, 3, 5, 7, 11, 13][n];
        return {avg: p, min: p, max: p};
    }

    n++; // since we are 0-based

    const ln = Math.log(n);
    const lnln = Math.log(ln);

    // from: https://math.stackexchange.com/questions/2741997/approximation-for-nth-prime-number
    const min = n * (ln + lnln - 1) + (n * lnln - 2.1 * n) / ln;

    let max;

    // from: https://stackoverflow.com/questions/1042717/is-there-a-way-to-find-the-approximate-value-of-the-nth-prime
    if (n >= 688_383) {
        // Dusart 2010 page 2
        max = n * (ln + lnln - 1 + ((lnln - 2) / ln));
    } else if (n >= 178_974) {
        // Dusart 2010 page 7
        max = n * (ln + lnln - 1 + ((lnln - 1.95) / ln));
    } else if (n >= 39_017) {
        // Dusart 1999 page 14
        max = n * (ln + lnln - 0.9484);
    } else {
        // Modified from Robin 1983 for 6-39016 only
        max = n * (ln + 0.6 * lnln);
    }

    return {
        avg: Math.round((min + max) / 2),
        min: Math.ceil(min),
        max: Math.floor(max)
    };
}

// for testing:
// npm run test-file test/nth-prime-approx.spec.ts
