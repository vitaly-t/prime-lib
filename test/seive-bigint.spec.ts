import {expect} from './header';
import {sieveBigint} from '../src/sieve-bigint';
import {stopOnValue} from '../src/stop';

describe('sieve-bigint', () => {
    it('must generate correct values', () => {
        const i = stopOnValue(sieveBigint(), 17n);
        expect([...i]).to.eql([2n, 3n, 5n, 7n, 11n, 13n, 17n]);
    });
});
