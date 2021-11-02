import {expect} from './header';
import {primes} from './primes';
import {primeFactors} from '../src';

describe('primeFactors', () => {
    it('must cover complete initial range', () => {
        for (let i = 2; i < 1000; i++) {
            const res = primeFactors(i).reduce((c, i) => c *= i, 1);
            expect(res).to.eql(i);
        }
    });
    it('must work for all prime numbers', () => {
        for (const p of primes) {
            expect(primeFactors(p)).to.eql([p]);
        }
    }).timeout(100); // 100 is minimum for the current implementation :(
    it('must handle some interesting cases', () => {
        // from here: https://projecteuler.net/problem=3
        expect(primeFactors(600_851_475_143)).to.eql([71, 839, 1471, 6857]);
    });
    it('must handle large complex numbers', () => {
        // TODO: This doesn't work currently (too slow)
        // expect(primeFactors(2 ** 50 - 2)).to.eql([?]);
    });
});
