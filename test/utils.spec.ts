import {expect} from './header';
import {stopWhen, stopOnCount, stopOnValue} from '../src';

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

describe('stopOnCount', () => {
    it('must produce nothing when count = 0', () => {
        const res = [...stopOnCount([1, 2, 3][Symbol.iterator](), 0)];
        expect(res).to.eql([]);
    });
    it('must produce nothing when count < 0', () => {
        const res = [...stopOnCount([1, 2, 3][Symbol.iterator](), -1)];
        expect(res).to.eql([]);
    });
});

describe('stopOnValue', () => {
    it('must stop when reaching the value', () => {
        const res = [...stopOnValue([1, 2, 3][Symbol.iterator](), 2)];
        expect(res).to.eql([1, 2]);
    });
    it('must exclude value outside the range', () => {
        const res = [...stopOnValue([1, 4, 9][Symbol.iterator](), 8.99)];
        expect(res).to.eql([1, 4]);
    });
});
