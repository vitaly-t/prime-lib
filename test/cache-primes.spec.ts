import {expect} from './header';
import {primes} from './primes';
import {isPrime} from '../src';
import {cachePrimes, maxSmallGaps} from '../src';

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
    it('must create primes from compressed gaps', () => {
        const size = maxSmallGaps + 1000;
        const c = cachePrimes(size);
        expect(c.length).to.eql(size);
        for (let i = maxSmallGaps; i < size; i++) {
            expect(isPrime(c[i])).to.be.true;
        }
        let p;
        for (const a of c) {
            p = a;
        }
        expect(c[0]).to.eql(2);
        expect(c[1]).to.eql(3);
        expect(p).to.eql(c[size - 1]);
    }).timeout(10_000);
    it('must handle bad cache size', () => {
        expect([...cachePrimes(0)]).to.eql([]);
        expect([...cachePrimes(-1)]).to.eql([]);
    });
});
