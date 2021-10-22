/**
 * Maximum prime number that can be generated in JavaScript,
 * using the standard 'number' type (53-bit of integer range).
 */
export const maxPrime = 9_007_199_254_740_881;

/**
 * Result of a prime approximation, such as counting primes,
 * or getting a prime from index.
 */
export interface IPrimeApprox {
    /**
     * Average (best-guess) approximation.
     */
    avg: number;

    /**
     * Minimum possible value.
     */
    min: number;

    /**
     * Maximum possible value.
     */
    max: number;
}
