import {expect} from './header';
import {primes} from './primes';
import {cachePrimes} from '../src';

describe('cachePrimes', () => {
    it('must access elements through iteration', () => {
        expect([...cachePrimes(primes.length)]).to.eql(primes);
    });
    it('must access elements by index', () => {
        const res = [];
        const c = cachePrimes(primes.length);
        for (let i = 0; i < c.length; i++) {
            res.push(c[i]);
        }
        expect(res).to.eql(primes);
    });
    it('must return undefined for any invalid index', () => {
        const c = cachePrimes(5);
        expect(c[-1]).to.be.undefined;
        expect(c[5]).to.be.undefined;
        expect(c[NaN]).to.be.undefined;
        expect(c[Number.NaN]).to.be.undefined;
        expect(c['bla' as any]).to.be.undefined;
    });
    it('must return length correctly', () => {
        const c = cachePrimes(5);
        expect(c.length).to.eql(5);
        expect(c['length']).to.eql(5);
    });
    /*
    it('must not create cache larger than the maximum', () => {
        const c = cachePrimes(maxCacheSize + 1);
        expect(c.length).to.eql(maxCacheSize);
    }).timeout(10_000);*/
});
