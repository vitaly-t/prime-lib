import {isPrime} from '../../src';
import {ITestInput, ITestResult} from './common';

export function testIsPrime(): ITestResult {
    const tests: ITestInput = {
        '0 -> 10^6': {
            start: 0,
            limit: 1_000_000,
            desc: 'Time in ms, to verify the first million numbers'
        },
        '0 -> 10^7': {
            start: 0,
            limit: 10_000_000,
            desc: 'Time in ms, to verify the first 10 million numbers'
        },
        '0 -> 10^8': {
            start: 0,
            limit: 100_000_000,
            desc: 'Time in ms, to verify the first 100 million numbers'
        },
        '10^9 -> 10^6': {
            start: 1_000_000_000,
            limit: 1_000_000,
            desc: 'Time in ms, to verify 1 million numbers, after 1 billion'
        },
        '10^10 -> 10^6': {
            start: 10_000_000_000,
            limit: 1_000_000,
            desc: 'Time in ms, to verify 1 million numbers, after 10 billions'
        },
        '10^11 -> 1000': {
            start: 100_000_000_000,
            limit: 1_000,
            desc: 'Time in ms, to verify 1000 numbers, after 100 billions'
        },
        '10^12 -> 1000': {
            start: 1_000_000_000_000,
            limit: 1_000,
            desc: 'Time in ms, to verify 1000 numbers, after 1 trillion'
        },
        '10^13 -> 1000': {
            start: 10_000_000_000_000,
            limit: 1_000,
            desc: 'Time in ms, to verify 1000 numbers, after 10 trillions'
        },
        '10^14 -> 1000': {
            start: 100_000_000_000_000,
            limit: 1_000,
            desc: 'Time in ms, to verify 1000 numbers, after 100 trillions'
        },
        '10^15 -> 1000': {
            start: 1_000_000_000_000_000,
            limit: 1_000,
            desc: 'Time in ms, to verify 1000 numbers, after 1 quadrillion'
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
            'ms': Date.now() - begin,
            'Description': desc
        };
    }
    return result;
}
