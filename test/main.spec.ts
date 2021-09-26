import {expect} from './header';

describe('for an empty string', () => {
    it('must fail correctly', () => {
        expect(123).to.eql(123);
    });
});
