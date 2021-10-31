import chai from 'chai';
import {describe} from 'mocha';

const expect = chai.expect;

export {chai, describe, expect};

export function countItems(i: Iterable<any>): number {
    const a = i[Symbol.iterator]();
    let count = 0;
    while (!a.next().done) {
        count++;
    }
    return count;
}
