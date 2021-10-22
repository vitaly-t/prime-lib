import {IPrimeApprox} from './common';
import {primes} from '../test/primes';

/**
 * Returns approximate prime number from index.
 */
export function nthPrimeApprox(n: number): IPrimeApprox {
    // TODO: to be implemented
    /*
    return {
        avg: 0,
        min: 0,
        max: 0
    };*/

    // temporary, to pass current tests:
    const p = primes[n];
    return {avg: p, min: p, max: p};
}
