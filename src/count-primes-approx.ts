import {IPrimeApprox} from './common';
import {sieveIntBoost} from './soe-generators';

/**
 Pierre Dusart's formula works when x > 598
 */
const calcLimit = 598;

/**
 * The last count is 108, so a single byte is sufficient.
 */
const countsCache = new Uint8Array(calcLimit - 1);

/**
 * For best performance, we cache up 597 first counts here.
 */
(function prepareCounts() {
    const p = [...sieveIntBoost(108)];
    let k = 0, count = 1;
    for (let i = 2; i <= calcLimit; i++) {
        if (i === p[k + 1]) {
            k++;
            count++;
        }
        countsCache[i - 2] = count;
    }
})();

/**
 * Approximate primes count calculation, up to the value of x, based on Pierre Dusart's formula:
 * when x > 598, the following is true: (x/ln x)(1 + 0.992/ln x) < π(x) < (x/ln x)(1 + 1.2762/ln x)
 *
 * When x <= 598, the count is 100% accurate; and when x > 598, the error margin is < 1%
 *
 * See: https://primes.utm.edu/howmany.html
 */
export function countPrimesApprox(x: number): IPrimeApprox {
    if (x > calcLimit) {
        const ln = Math.log(x);
        const primeBound = (offset: number) => x / ln * (1 + offset / ln);
        const min = primeBound(0.992);
        const max = primeBound(1.2762);
        return {
            avg: Math.round((min + max) / 2), // best-guess value, with error margin < 1%
            min: Math.ceil(min),
            max: Math.floor(max)
        };
    }
    const c = x >= 2 ? countsCache[x - 2] : 0;
    return {avg: c, min: c, max: c};
}
