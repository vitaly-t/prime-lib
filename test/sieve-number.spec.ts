import {expect, generatorLimit, generatorValues} from './header';
import {sieveNumber} from '../dist/sieve-number';

describe('sieve-number', () => {
    it('must generate correct values', () => {
        const g = generatorLimit(sieveNumber(), 17);
        expect(generatorValues(g)).to.eql([2, 3, 5, 7, 11, 13, 17]);
    });
});
