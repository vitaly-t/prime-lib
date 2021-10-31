import chai from 'chai';
import {describe} from 'mocha';

const expect = chai.expect;

export {chai, describe, expect};

export function countItems(iterator: Iterable<any>): number {
    const r = iterator[Symbol.iterator]();
    let count = 0;
    while (!r.next().done) {
        count++;
    }
    return count;
}
