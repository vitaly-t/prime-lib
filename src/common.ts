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
