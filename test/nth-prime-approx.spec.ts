import {expect} from './header';
import {nthPrimeApprox} from '../src';
import {primes} from './primes';

describe('nthPrimeApprox', () => {
    describe('for initial primes', () => {
        it('must produce margin < 1', () => {
            for (let i = 0; i < primes.length; i++) {
                const p = primes[i];
                const {avg} = nthPrimeApprox(i);
                const margin = 100 * Math.abs(p - avg) / Math.max(p, avg);
                const errMsg = `Failed for ${i}, with margin ${margin}`;
                expect(margin, errMsg).to.be.lessThan(1);
            }
        });
    });
});
