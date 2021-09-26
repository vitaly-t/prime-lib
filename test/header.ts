import chai from 'chai';
import {describe} from 'mocha';

const expect = chai.expect;

export {chai, describe, expect};

export function* generatorLimit<T = number>(i: IterableIterator<T>, maxValue: T): IterableIterator<T> {
    let a, n;
    do {
        n = i.next();
        if (n.value > maxValue) {
            break;
        }
        a = n.value;
        yield a;
    } while (true);
    return a;
}

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
