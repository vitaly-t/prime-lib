import {expect} from './header';
import {nthPrimeApprox} from '../src';
import {primeFromIndex, primes} from './primes';

const calcMargin = (a: number, b: number) => 100 * Math.abs(a - b) / Math.max(a, b);

describe('nthPrimeApprox', () => {
    describe('for initial indexes', () => {
        it('must produce margin < 1', () => {
            const values = primes;
            for (let i = 0; i < values.length; i++) {
                const p = values[i];
                const r = nthPrimeApprox(i);
                const margin = calcMargin(p, r.avg);
                const errMsg = `Failed for ${i} (expected ${p}), with margin ${margin}. Result: ${JSON.stringify(r)}`;
                expect(margin, errMsg).to.be.lessThan(1);
            }
        });
    });
    describe('for wide-range indexes', () => {
        it('must produce margin < 1', () => {
            for (const kc of primeFromIndex) {
                const r = nthPrimeApprox(kc.i);
                const margin = calcMargin(kc.p, r.avg);
                const errMsg = `Failed for ${kc.i} (expected ${kc.p}), with margin ${margin}. Result: ${JSON.stringify(r)}`;
                expect(margin, errMsg).to.be.lessThan(1);
            }
        });
    });
});
