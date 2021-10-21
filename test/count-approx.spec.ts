import {expect} from './header';
import {countPrimesApprox} from '../src';

const calc = (x: number) => countPrimesApprox(x);

describe('countPrimesApprox', () => {
    describe('below or equal 598', () => {
        it('must give 100% precision count', () => {
            const sameValues = (a: number) => ({min: a, max: a, average: a});
            expect(calc(2)).to.eql(sameValues(1));
            expect(calc(10)).to.eql(sameValues(4));
            expect(calc(100)).to.eql(sameValues(25));
            expect(calc(598)).to.eql(sameValues(108));
        });
    });

    describe('above 598', () => {
        it('must calculate with margin < 1%', () => {
            const tests = [
                {
                    value: 599,
                    average: 109
                },
                {
                    value: 10e2,
                    average: 168
                },
                {
                    value: 10e3,
                    average: 1229
                },
                {
                    value: 10e4,
                    average: 9592
                },
                {
                    value: 10e5,
                    average: 78498
                },
                {
                    value: 10e6,
                    average: 664579
                },
                {
                    value: 10e7,
                    average: 5761455
                },
                {
                    value: 10e8,
                    average: 50847534
                }
            ];
            for (const t of tests) {
                const r = calc(t.value);
                const margin = 100 * Math.abs(r.average - t.average) / Math.max(r.average, t.average);
                expect(margin, `Failed for ${t.value}`).to.be.lessThan(1);
            }
        });
    });
});
