import {expect, generatorValues} from './header';
import {sieveNumber} from '../src/sieve-number';
import {stopOnValue} from '../src/stop';

describe('sieve-number', () => {
    it('must generate correct values', () => {
        const g = stopOnValue(sieveNumber(), 17);
        expect(generatorValues(g)).to.eql([2, 3, 5, 7, 11, 13, 17]);
    });
});
