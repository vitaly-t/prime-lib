import {expect} from './header';
import {nthPrimeApprox} from '../src';

describe('nthPrimeApprox', () => {
    it('must work', () => {
        expect(nthPrimeApprox(0)).to.eql({avg: 0, min: 0, max: 0});
    });
});
