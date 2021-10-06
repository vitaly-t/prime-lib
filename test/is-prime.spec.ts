import {expect} from './header';
import {primes} from './primes';
import {isPrime, maxPrime} from '../src';

describe('isPrime', () => {

    describe('for initial range of numbers', () => {
        it('must return correct result', () => {
            for (let i = 0; i < 1000; i++) {
                const isInPrimes = primes.indexOf(i) >= 0;
                expect(isPrime(i), `Failed for ${i}`).to.eql(isInPrimes);
            }
        });
    });

    describe('for values outside maxPrime', () => {
        it('must fail the test', () => {
            expect(isPrime(maxPrime + 111)).to.be.false;
        });
    });

    describe('for invalid prime numbers', () => {
        it('must return false', () => {
            const values = [-2, -1, 0, 1, 1.5, 1.99, 2.01, 3.1, 4, 6, 8, 9];
            for (const a of values) {
                expect(isPrime(a), `Failed for ${a}`).to.be.false;
            }
            expect(isPrime('bla-bla' as any)).to.be.false;
        });
    });

    describe('for initial range of bigint-s', () => {
        it('must return correct result', () => {
            for (let i = 0; i < 1000; i++) {
                const isInPrimes = primes.indexOf(i) >= 0;
                expect(isPrime(BigInt(i)), `Failed for ${i}`).to.eql(isInPrimes);
            }
        });
    });

    describe('for invalid prime bigint-s', () => {
        it('must return false', () => {
            const values = [0n, 1n, 4n, 6n, 8n, 9n, 10n, 12n];
            for (const a of values) {
                expect(isPrime(a), `Failed for ${a}`).to.be.false;
            }
        });
    });

    describe('for special cases', () => {
        it('must recognize the maximum prime number', () => {
            expect(isPrime(maxPrime)).to.be.true;
        });
        it('must recognize the maximum prime bigint', () => {
            expect(isPrime(BigInt(maxPrime))).to.be.true;
        });
        it('must reject when above maxPrime', () => {
            const hugePrime = 109000000000000005676789000007878700000000000000000055500000000000137n;
            expect(isPrime(hugePrime)).to.be.false;
        });
    });

});
