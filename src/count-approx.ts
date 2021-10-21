/**
 * Result of approximate primes count calculation,
 * based on Pierre Dusart's formula
 */
export interface IPrimesCountApprox {
    /**
     * Average (best-guess) number of primes.
     */
    avg: number;

    /**
     * Minimum possible number of primes.
     */
    min: number;

    /**
     * Maximum possible number of primes.
     */
    max: number;
}

/**
 Pierre Dusart's formula works when x > 598,
 so we need pre-calculated first 108 primes, up to 593:
 */
const primes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37,
    41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89,
    97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
    157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223,
    227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281,
    283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359,
    367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433,
    439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503,
    509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593
];

/**
 * Approximate primes count calculation, up to the value of x, based on Pierre Dusart's formula:
 * when x > 598, the following is true: (x/ln x)(1 + 0.992/ln x) < π(x) < (x/ln x)(1 + 1.2762/ln x)
 *
 * When x <= 598, the count is 100% accurate; and when x > 598, the error margin is < 1%
 *
 * See: https://primes.utm.edu/howmany.html
 */
export function countPrimesApprox(x: number): IPrimesCountApprox {
    if (x > 598) {
        const ln = Math.log(x);
        const a = x / ln * (1 + 0.992 / ln);
        const b = x / ln * (1 + 1.2762 / ln);
        return {
            avg: Math.round((a + b) / 2),
            min: Math.ceil(a),
            max: Math.floor(b)
        };
    }
    let i = 0;
    if (x >= 2) {
        i = -1;
        while (primes[++i] <= x);
    }
    return {avg: i, min: i, max: i};
}
