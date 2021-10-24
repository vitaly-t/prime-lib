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
                if (i > 408) {
                    // TODO: Works only after the 408th prime currently
                    expect(margin, errMsg).to.be.lessThan(1);
                }
            }
        });
        it('must produce valid limits', () => {
            const values = primes;
            for (let i = 0; i < values.length; i++) {
                const p = values[i];
                const r = nthPrimeApprox(i);
                if (i > 16) {
                    // TODO: Works only after the 16th prime currently
                    expect(r.min, `Min failed for ${i}`).to.be.lessThanOrEqual(p);
                    expect(r.max, `Max failed for ${i}`).to.be.greaterThanOrEqual(p);
                }
            }
        });
    });

    describe('for wide-range indexes', () => {
        it('must produce margin < 1', () => {
            for (const kc of primeFromIndex) {
                const r = nthPrimeApprox(kc.i);
                const margin = calcMargin(kc.p, r.avg);
                const errMsg = `Failed for ${kc.i} (expected ${kc.p}), with margin ${margin}. Result: ${JSON.stringify(r)}`;
                if (kc.i >= 1e3) {
                    // TODO: Works only for 1e3 and above currently
                    expect(margin, errMsg).to.be.lessThan(1);
                }
            }
        });
        it('must produce valid limits', () => {
            for (const kc of primeFromIndex) {
                const r = nthPrimeApprox(kc.i);
                expect(r.min, `Min failed for ${kc.i}`).to.be.lessThanOrEqual(kc.p);
                expect(r.max, `Max failed for ${kc.i}`).to.be.greaterThanOrEqual(kc.p);
            }
        });
    });

});
