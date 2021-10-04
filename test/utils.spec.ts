import {expect} from './header';
import {bigSqrt, bigCeil} from '../src/utils';

describe('bigCeil', () => {
    it('must succeed for small numbers', () => {
        for (let i = 1; i < 100; i++) {
            for (let k = 1; k < 100; k++) {
                const a = bigCeil(BigInt(i), BigInt(k));
                const b = BigInt(Math.ceil(i / k));
                expect(a, `Failed for ${i}/${k}`).to.eql(b);
            }
        }
    });

    it('must succeed for large numbers', () => {
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
