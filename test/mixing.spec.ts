import {expect} from './header';
import {isPrime, stopOnCount} from '../src';
import {sieveBigInt, sieveBigIntStart, sieveInt, sieveIntStart} from '../src/sieve';

describe('mixing', () => {
    describe('for start values', () => {
        it('must pass prime test', () => {
            const i = stopOnCount(sieveInt(), 1000);
            [...i].forEach(a => {
                expect(isPrime(a), `Failed for ${a}`).to.be.true;
            });
        });
    });

    describe('for offset values', () => {
        it('must pass prime test', () => {
            const i = stopOnCount(sieveIntStart(100_000), 1000);
            [...i].forEach(a => {
                expect(isPrime(a), `Failed for ${a}`).to.be.true;
            });
        });
    });

    describe('for bigint start values', () => {
        it('must pass prime test', () => {
            const i = stopOnCount(sieveBigInt(), 1000);
            [...i].forEach(a => {
                expect(isPrime(a), `Failed for ${a}`).to.be.true;
            });
        });
    });

    describe('for bigint offset values', () => {
        it('must pass prime test', () => {
            const i = stopOnCount(sieveBigIntStart(100_000n), 10_000);
            [...i].forEach(a => {
                expect(isPrime(a), `Failed for ${a}`).to.be.true;
            });
        });
    });
});
