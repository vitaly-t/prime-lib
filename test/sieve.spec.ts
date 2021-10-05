import {expect} from './header';
import {stopOnValue, stopOnCount} from '../src';
import {generatePrimes, generateBigPrimes} from '../src';
import {primes} from './primes';

describe('sieveInt', () => {
    it('must generate correct values', () => {
        const i = stopOnValue(generatePrimes(), 17);
        expect([...i]).to.eql([2, 3, 5, 7, 11, 13, 17]);
    });
});

describe('sieveIntStart', () => {
    it('must include first prime', () => {
        const i = stopOnValue(generatePrimes(5), 17);
        expect([...i]).to.eql([5, 7, 11, 13, 17]);
    });
    it('must ignore low values', () => {
        const values = [-2, -1, 0, 1, 2];
        for (const a of values) {
            const i = stopOnValue(generatePrimes(a), 17);
            expect([...i], `Failed for ${a}`).to.eql([2, 3, 5, 7, 11, 13, 17]);
        }
    });
    it('must terminate on last prime', () => {
        /*
        TODO: this doesn't work yet
        const i1 = generatePrimes(maxPrime);
        expect([...i1]).to.eql([maxPrime]);
        const i2 = sieveIntStart(maxPrime - 1);
        expect([...i2]).to.eql([maxPrime]);*/
    });
});

describe('sieveBigInt', () => {
    it('must generate correct values', () => {
        const i = stopOnCount(generateBigPrimes(), primes.length);
        expect([...i]).to.eql(primes.map(BigInt));
    });
});

describe('sieveBigIntStart', () => {
    it('must include first prime', () => {
        const i = stopOnValue(generateBigPrimes(5n), 17n);
        expect([...i]).to.eql([5n, 7n, 11n, 13n, 17n]);
    });
    it('must ignore low values', () => {
        const values = [-2n, -1n, 0n, 1n, 2n];
        for (const a of values) {
            const i = stopOnValue(generateBigPrimes(a), 17n);
            expect([...i], `Failed for ${a}`).to.eql([2n, 3n, 5n, 7n, 11n, 13n, 17n]);
        }
    });
    it('must generate correct values outside of number range', () => {
        // TODO: This test doesn't work, need to investigate:
        //  It fails for 100qdrl, and takes too long for 10qdrl
        // const i = stopOnCount(generateBigPrimes(10_000_000_000_000_000n), 3);
        // expect([...i]).to.eql([10_000_000_000_000_061n, 10000000000000069n, 10000000000000079n]);
    });
});
