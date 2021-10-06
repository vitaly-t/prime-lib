import {expect} from './header';
import {bigSqrt, bigCeil} from '../src/utils';
import {stopWhen} from '../src'; // importing from root helps with coverage

describe('bigCeil', () => {
    it('must succeed for small numbers', () => {
        for (let i = 0; i < 100; i++) {
            for (let k = 1; k < 100; k++) {
                const a = bigCeil(BigInt(i), BigInt(k));
                const b = BigInt(Math.ceil(i / k));
                expect(a, `Failed for ${i}/${k}`).to.eql(b);
            }
        }
    });
    it('must succeed for large numbers', () => {
        expect(bigCeil(30022323333880000235423225605234678947n, 478671234004512356789n)).to.eql(62720132736443036n);
    });
    it('must throw on negative inputs', () => {
        const err = 'Negative inputs are not supported';
        expect(() => {
            bigCeil(-1n, 0n);
        }).to.throw(err);
        expect(() => {
            bigCeil(0n, -1n);
        }).to.throw(err);
    });
});

describe('bigSqrt', () => {
    it('must succeed for small numbers', () => {
        for (let i = 1; i < 100; i++) {
            const a = bigSqrt(BigInt(i));
            const b = BigInt(Math.floor(Math.sqrt(i)));
            expect(a, 'Failed for: ' + i).to.eql(b);
        }
    });
    it('must succeed for large numbers', () => {
        [
            124560002323342354540933480631044988304n,
            5245600000023237006119670278784665209n,
            524560000002323700611900000000309965494285257468932833112577841n
        ].forEach(v => {
            const a = bigSqrt(v);
            expect(a * a, 'Failed for: ' + v).to.eql(v);
        });
    });
});

describe('stopWhen', () => {
    it('must stop on condition', () => {
        const gen = function* (limit: number) {
            let i = 0;
            while (i++ < limit) {
                yield i;
            }
        };
        const res = [...stopWhen(gen(100), (_, index) => index === 5)];
        expect(res).to.eql([1, 2, 3, 4, 5]);
    });
});
