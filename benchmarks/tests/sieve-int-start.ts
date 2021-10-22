import {ITestInput, ITestResult} from './common';
import {generatePrimes} from '../../src';

export function testSieveIntStart(): ITestResult {
    const tests: ITestInput = {
        '3 -> 1e6': {
            start: 3,
            desc: 'Generate 1 million primes, after 3'
        },
        '1e6 -> 1e6': {
            start: 1e6,
            desc: 'Generate 1 million primes, after 1 million'
        },
        '1e9 -> 1e6': {
            start: 1e9,
            desc: 'Generate 1 million primes, after 1 billion'
        },
        '1e10 -> 1e6': {
            start: 1e10,
            desc: 'Generate 1 million primes, after 10 billions'
        },
        '1e11 -> 1e6': {
            start: 1e11,
            desc: 'Generate 1 million primes, after 100 billions'
        },
        '1e12 -> 1e6': {
            start: 1e12,
            desc: 'Generate 1 million primes, after 1 trillion'
        },
        '1e13 -> 1e6': {
            start: 1e13,
            desc: 'Generate 1 million primes, after 10 trillions'
        },
        '1e14 -> 1e6': {
            start: 1e14,
            desc: 'Generate 1 million primes, after 100 trillions'
        },
        '1e15 -> 1e6': {
            start: 1e15,
            desc: 'Generate 1 million primes, after 1 quadrillion'
        }
    };
    const result: any = {};
    for (const t in tests) {
        const i = generatePrimes({start: tests[t].start});
        const start = Date.now();
        let count = 0, p, f;
        do {
            p = i.next();
            f = f || p;
        } while (++count < 1_000_000);
        result[t] = {
            'description': tests[t].desc,
            'ms': Date.now() - start,
            'first prime': f.value
        };
    }
    return result;
}
