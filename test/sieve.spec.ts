import {expect} from './header';
import {stopOnValue} from '../src';
import {generatePrimes} from '../src';

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
