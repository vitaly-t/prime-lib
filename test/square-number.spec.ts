import {expect, generatorValues} from './header';
import {squareNumber} from '../src/square-number';
import {stopOnCount} from '../src/stop';

const generate = (start: number, maxValue: number) => generatorValues(stopOnCount(squareNumber(start), maxValue));

describe('square-number', () => {
    it('must handle critical start points', () => {
        const startPoints = [-2, -1, 0, 1, 2];
        startPoints.forEach(sp => {
            expect(generate(sp, 7)).to.eql([2, 3, 5, 7, 11, 13, 17]);
        });
    });
    it('must handle start offsets', () => {
        /*
        expect(generate(3, 3)).to.eql([3, 5, 7]);
        expect(generate(4, 3)).to.eql([5, 7, 11]);
        expect(generate(5, 3)).to.eql([5, 7, 11]);
        expect(generate(6, 3)).to.eql([7, 11, 13]);
        expect(generate(7, 3)).to.eql([7, 11, 13]);
        expect(generate(8, 3)).to.eql([11, 13, 17]);*/
    });
});
