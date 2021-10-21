import {expect} from './header';
import {countPrimesApprox} from '../src';

const calc = (x: number) => countPrimesApprox(x);
const sameValues = (a: number) => ({min: a, max: a, avg: a});

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
            // actual counts taken from: https://primes.utm.edu/howmany.html
            const tests = [
                {x: 599, count: 109},
                {x: 10e2, count: 168},
                {x: 10e3, count: 1_229},
                {x: 10e4, count: 9_592},
                {x: 10e5, count: 78_498},
                {x: 10e6, count: 664_579},
                {x: 10e7, count: 5_761_455},
                {x: 10e8, count: 50_847_534},
                {x: 10e9, count: 455_052_511},
                {x: 10e10, count: 4_118_054_813},
                {x: 10e11, count: 37_607_912_018},
                {x: 10e12, count: 346_065_536_839},
                {x: 10e13, count: 3_204_941_750_802},
                {x: 10e14, count: 29_844_570_422_669},
                {x: 10e15, count: 279_238_341_033_925},
                {x: 10e16, count: 2_623_557_157_654_233},
                {x: 10e17, count: 24_739_954_287_740_860},
                {x: 10e18, count: 234_057_667_276_344_607},
                {x: 10e19, count: 2_220_819_602_560_918_840},
                {x: 10e20, count: 21_127_269_486_018_731_928},
                {x: 10e21, count: 201_467_286_689_315_906_290},
                {x: 10e22, count: 1_925_320_391_606_803_968_923},
                {x: 10e23, count: 18_435_599_767_349_200_867_866},
                {x: 10e24, count: 176_846_309_399_143_769_411_680}
            ];
            for (const t of tests) {
                const r = calc(t.x);
                // note that after 1mln, the margin becomes less than 0.2%
                const margin = 100 * Math.abs(r.avg - t.count) / Math.max(r.avg, t.count);
                const res = `{min: ${r.min.toLocaleString()}, avg: ${r.avg.toLocaleString()}, max: ${r.max.toLocaleString()}}`;
                expect(margin, `Failed for ${res}`).to.be.lessThan(1);
            }
        });
    });
});
