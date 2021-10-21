import {expect} from './header';
import {countPrimes} from '../src/count';

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
        it('must give 100% precision count', () => {
            expect(countPrimes(2)).to.eql(1);
            expect(countPrimes(10)).to.eql(4);
            expect(countPrimes(100)).to.eql(25);
            expect(countPrimes(598)).to.eql(108);
        });
    });

});
