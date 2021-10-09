import {expect} from './header';
import {stopWhen} from '../src'; // importing from root helps with coverage

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
