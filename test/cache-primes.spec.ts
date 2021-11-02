import {expect} from './header';
import {primes} from './primes';
import {isPrime} from '../src';
import {cachePrimes, maxSmallGaps} from '../src';

const c5 = cachePrimes(5);

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
    it('must return undefined for a bad-type index', () => {
        expect(c5[NaN]).to.be.undefined;
        expect(c5[Number.NaN]).to.be.undefined;
        expect(c5['bla' as any]).to.be.undefined;
    });
    it('must return length correctly', () => {
        expect(c5.length).to.eql(5);
        expect(c5['length']).to.eql(5);
    });
    it('must create primes from compressed gaps', () => {
        const size = maxSmallGaps + 1000;
        const c = cachePrimes(size);
        expect(c.length).to.eql(size);
        for (let i = maxSmallGaps; i < size; i++) {
            const a = c.fastIndex.get(i);
            expect(isPrime(a)).to.be.true;
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

    describe('fastIndex', () => {
        const indexErr = (index: number, length: number) => `Prime index ${JSON.stringify(index)} is outsize range (length = ${length})`;
        const typeErr = (index: any) => `Invalid prime index ${JSON.stringify(index)} specified.`;
        it('must throw error for negative index', () => {
            expect(() => {
                c5.fastIndex.get(-1);
            }).to.throw(indexErr(-1, 5));
        });
        it('must throw error for too large index', () => {
            expect(() => {
                c5.fastIndex.get(5);
            }).to.throw(indexErr(5, 5));
        });
        it('must throw error for a bad-type index', () => {
            expect(() => {
                c5.fastIndex.get('ops' as any);
            }).to.throw(typeErr('ops'));
            expect(() => {
                c5.fastIndex.get(NaN);
            }).to.throw(typeErr(NaN));
        });
    });
});
