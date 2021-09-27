import chai from 'chai';
import {describe} from 'mocha';

const expect = chai.expect;

export {chai, describe, expect};

export function generatorValues<T>(i: IterableIterator<T>): Array<T> {
    const res = [];
    let a;
    do {
        a = i.next();
        if (!a.done) {
            res.push(a.value);
        }
    } while (!a.done);
    return res;
}
