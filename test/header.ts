import chai from 'chai';
import {describe} from 'mocha';

const expect = chai.expect;

export {chai, describe, expect};

export function countItems(iterator: IterableIterator<any>): number {
    let count = 0;
    while (!iterator.next().done) {
        count++;
    }
    return count;
}
