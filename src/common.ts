/**
 * Maximum prime number that can be generated in JavaScript,
 * using the standard 'number' type (53-bit of integer range).
 */
export const maxPrime = 9_007_199_254_740_881;

/**
 * Result of a prime approximation, such as counting primes,
 * or getting a prime from index, i.e. result from functions
 * countPrimesApprox and nthPrimeApprox.
 */
export interface IPrimeApprox {
    /**
     * Average (best-guess) approximation.
     *
     * It is calculated before min is rounded up and max is rounded down,
     * therefore it is not quite (min + max) / 2, but it is close.
     */
    avg: number;

    /**
     * Minimum possible value, rounded up / CEIL.
     */
    min: number;

    /**
     * Maximum possible value, rounded down / FLOOR.
     */
    max: number;
}
