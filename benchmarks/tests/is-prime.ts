import {ITestInput, ITestResult} from './common';
import {isPrime} from '../../src';

export function testIsPrime(): ITestResult {
    const tests: ITestInput = {
        '0 -> 1e6': {
            start: 0,
            limit: 1e6,
            desc: 'Verify the first million numbers'
        },
        '0 -> 1e7': {
            start: 0,
            limit: 1e7,
            desc: 'Verify the first 10 million numbers'
        },
        '0 -> 1e8': {
            start: 0,
            limit: 1e8,
            desc: 'Verify the first 100 million numbers'
        },
        '1e9 -> 1e6': {
            start: 1e9,
            limit: 1e6,
            desc: 'Verify 1 million numbers, after 1 billion'
        },
        '1e10 -> 1e6': {
            start: 1e10,
            limit: 1e6,
            desc: 'Verify 1 million numbers, after 10 billions'
        },
        '1e11 -> 1e3': {
            start: 1e11,
            limit: 1e3,
            desc: 'Verify 1000 numbers, after 100 billions'
        },
        '1e12 -> 1e3': {
            start: 1e12,
            limit: 1e3,
            desc: 'Verify 1000 numbers, after 1 trillion'
        },
        '1e13 -> 1e3': {
            start: 1e13,
            limit: 1e3,
            desc: 'Verify 1000 numbers, after 10 trillions'
        },
        '1e14 -> 1e3': {
            start: 1e14,
            limit: 1e3,
            desc: 'Verify 1000 numbers, after 100 trillions'
        },
        '1e15 -> 1e3': {
            start: 1e15,
            limit: 1e3,
            desc: 'Verify 1000 numbers, after 1 quadrillion'
        }
    };

    const result: any = {};
    for (const t in tests) {
        const {start, limit, desc} = tests[t];
        const end = start + limit;
        const begin = Date.now();
        for (let i = start; i < end; i++) {
            isPrime(i);
        }
        result[t] = {
            'description': desc,
            'ms': Date.now() - begin
        };
    }
    return result;
}
