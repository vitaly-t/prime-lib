import {expect} from './header';
import {countPrimes} from '../src';

describe('countPrimes', () => {
    describe('x < 2', () => {
        it('must produce 0 count', () => {
            expect(countPrimes(1.999)).to.eql(0);
            expect(countPrimes(1)).to.eql(0);
            expect(countPrimes(0)).to.eql(0);
            expect(countPrimes(-1)).to.eql(0);
        });
    });

    describe('x >= 2', () => {
        it('must produce precise count', () => {
            const tests = [
                {x: 2, count: 1},
                {x: 10, count: 4},
                {x: 1e2, count: 25},
                {x: 1e3, count: 168},
                {x: 1e4, count: 1_229},
                {x: 1e5, count: 9_592},
                {x: 1e6, count: 78_498},
                {x: 1e7, count: 664_579},
                {x: 1e8, count: 5_761_455},
                {x: 1e9, count: 50_847_534},
                {x: 1e10, count: 455_052_511}
            ];
            for (const t of tests) {
                expect(countPrimes(t.x), `Failed for ${t.x.toLocaleString()}`).to.eql(t.count);
            }
        });
    });
});
