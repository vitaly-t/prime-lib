import {expect, generatorLimit, generatorValues} from './header';
import {sieveBigint} from '../dist/sieve-bigint';

describe('sieve-bigint', () => {
    it('must generate correct values', () => {
        const g = generatorLimit(sieveBigint(), 17n);
        expect(generatorValues(g)).to.eql([2n, 3n, 5n, 7n, 11n, 13n, 17n]);
    });
});
