import {expect} from './header';
import {sieveNumber} from '../src/sieve-number';
import {stopOnValue} from '../src/stop';

describe('sieve-number', () => {
    it('must generate correct values', () => {
        const i = stopOnValue(sieveNumber(), 17);
        expect([...i]).to.eql([2, 3, 5, 7, 11, 13, 17]);
    });
});
