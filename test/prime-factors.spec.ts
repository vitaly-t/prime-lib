import {expect} from './header';
import {primes} from './primes';
import {primeFactors} from '../src';

function verifyFactors(x: number): boolean {
    return primeFactors(x).reduce((c, i) => c *= i, 1) === x;
}

describe('primeFactors', () => {
    it('must cover complete initial range', () => {
        for (let i = 2; i < 1000; i++) {
            expect(verifyFactors(i)).to.be.true;
        }
    });
    it('must work for all prime numbers', () => {
        for (const p of primes) {
            expect(primeFactors(p)).to.eql([p]);
        }
    }).timeout(100); // 100 is minimum for the current implementation :(
    it('must handle some interesting cases', () => {
        expect(primeFactors(600_851_475_143)).to.eql([71, 839, 1471, 6857]);
        expect(primeFactors(1_125_899_906_842_622)).to.eql([2, 127, 4432676798593]);
        expect(primeFactors(Number.MAX_SAFE_INTEGER)).to.eql([6361, 69431, 20394401]);
    });
    it('it must throw error on invalid value', () => {
        expect(() => {
            primeFactors('bla' as any);
        }).to.throw('Invalid value "bla" specified.');
    });
    it('must throw error when outside range', () => {
        const err = (x: number) => `Value ${JSON.stringify(x)} is outside range (2 <= x <= ${Number.MAX_SAFE_INTEGER})`;
        expect(() => {
            primeFactors(1);
        }).to.throw(err(1));
        expect(() => {
            primeFactors(Number.MAX_SAFE_INTEGER + 1);
        }).to.throw(err(Number.MAX_SAFE_INTEGER + 1));
    });
});
