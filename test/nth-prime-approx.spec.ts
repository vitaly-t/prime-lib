import {expect} from './header';
import {nthPrimeApprox} from '../src';
// import {primes} from './primes';

describe('nthPrimeApprox', () => {
    // TODO: also test min and max values.
    describe('for initial primes', () => {
        it('must produce margin < 1', () => {
            // const values = primes;
            const values = [2, 3, 5, 7, 11]; // temporary
            for (let i = 0; i < values.length; i++) {
                const p = values[i];
                const r = nthPrimeApprox(i);
                const margin = 100 * Math.abs(p - r.avg) / Math.max(p, r.avg);
                const errMsg = `Failed for ${i} (expected ${p}), with margin ${margin}. Result: ${JSON.stringify(r)}`;
                expect(margin, errMsg).to.be.lessThan(1);
            }
        });
    });
});
