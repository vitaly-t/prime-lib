import {expect} from './header';
import {stopOnValue} from '../src/stop';
import {sieveBigInt, sieveInt} from '../src/sieve';

describe('sieveInt', () => {
    it('must generate correct values', () => {
        const i = stopOnValue(sieveInt(), 17);
        expect([...i]).to.eql([2, 3, 5, 7, 11, 13, 17]);
    });
});

describe('sieveBigInt', () => {
    it('must generate correct values', () => {
        const i = stopOnValue(sieveBigInt(), 17n);
        expect([...i]).to.eql([2n, 3n, 5n, 7n, 11n, 13n, 17n]);
    });
});
