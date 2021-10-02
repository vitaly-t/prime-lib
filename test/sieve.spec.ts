import {expect} from './header';
import {stopOnValue} from '../src';
import {
    sieveInt,
    sieveIntStart,
    sieveBigInt,
    sieveBigIntStart
} from '../src/sieve';

describe('sieveInt', () => {
    it('must generate correct values', () => {
        const i = stopOnValue(sieveInt(), 17);
        expect([...i]).to.eql([2, 3, 5, 7, 11, 13, 17]);
    });
});

describe('sieveIntStart', () => {
    it('must include first prime', () => {
        const i = stopOnValue(sieveIntStart(5), 17);
        expect([...i]).to.eql([5, 7, 11, 13, 17]);
    });
    it('must ignore low values', () => {
        const values = [-2, -1, 0, 1, 2];
        for (const a of values) {
            const i = stopOnValue(sieveIntStart(a), 17);
            expect([...i], `Failed for ${a}`).to.eql([2, 3, 5, 7, 11, 13, 17]);
        }
    });
});

describe('sieveBigInt', () => {
    it('must generate correct values', () => {
        const i = stopOnValue(sieveBigInt(), 17n);
        expect([...i]).to.eql([2n, 3n, 5n, 7n, 11n, 13n, 17n]);
    });
});

describe('sieveBigIntStart', () => {
    it('must include first prime', () => {
        const i = stopOnValue(sieveBigIntStart(5n), 17n);
        expect([...i]).to.eql([5n, 7n, 11n, 13n, 17n]);
    });
    it('must ignore low values', () => {
        const values = [-2n, -1n, 0n, 1n, 2n];
        for (const a of values) {
            const i = stopOnValue(sieveBigIntStart(a), 17n);
            expect([...i], `Failed for ${a}`).to.eql([2n, 3n, 5n, 7n, 11n, 13n, 17n]);
        }
    });
});
