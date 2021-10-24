import {expect} from './header';
import {countPrimesApprox} from '../src';
import {knownCounts} from './primes';

const calc = (x: number) => countPrimesApprox(x);

const sameValues = (a: number) => ({min: a, max: a, avg: a});

const calcMargin = (a: number, b: number) => 100 * Math.abs(a - b) / Math.max(a, b);

describe('countPrimesApprox', () => {
    describe('x < 2', () => {
        const zeroValues = sameValues(0);
        it('must produce 0 count', () => {
            expect(calc(1.999)).to.eql(zeroValues);
            expect(calc(1)).to.eql(zeroValues);
            expect(calc(0)).to.eql(zeroValues);
            expect(calc(-1)).to.eql(zeroValues);
        });
    });

    describe('2 <= x <= 598', () => {
        it('must give 100% precision count', () => {
            expect(calc(2)).to.eql(sameValues(1));
            expect(calc(10)).to.eql(sameValues(4));
            expect(calc(100)).to.eql(sameValues(25));
            expect(calc(598)).to.eql(sameValues(108));
        });
    });

    describe('x > 598', () => {
        it('must calculate with margin < 1%', () => {
            for (const t of knownCounts) {
                const r = calc(t.x);
                // note that after 1mln, the margin becomes less than 0.2%
                const margin = calcMargin(r.avg, t.count);
                const res = `{min: ${r.min.toLocaleString()}, avg: ${r.avg.toLocaleString()}, max: ${r.max.toLocaleString()}}`;
                expect(margin, `Failed for ${res}`).to.be.lessThan(1);
            }
        });
        it('must calculate correct limits', () => {
            for (const t of knownCounts) {
                const r = calc(t.x);
                expect(r.min, `Min failed for ${t.x}`).to.be.lessThanOrEqual(t.count);
                expect(r.max, `Max failed for ${t.x}`).to.be.greaterThanOrEqual(t.count);
            }
        });
    });
});
