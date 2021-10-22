import {expect} from './header';
import {nthPrime} from '../src';

describe('nthPrime', () => {
    it('must work', () => {
        expect(nthPrime(0)).to.eql(2);
    });
});
