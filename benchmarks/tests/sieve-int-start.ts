import {generatePrimes} from '../../src';
import {ITestInput, ITestResult} from './common';

export function testSieveIntStart(): ITestResult {
    const tests: ITestInput = {
        '3 -> 10^6': {
            start: 3,
            desc: 'Time in ms, to generate 1 million primes, after 3'
        },
        '10^6 -> 10^6': {
            start: 1_000_000,
            desc: 'Time in ms, to generate 1 million primes, after 1 million'
        },
        '10^9 -> 10^6': {
            start: 1_000_000_000,
            desc: 'Time in ms, to generate 1 million primes, after 1 billion'
        },
        '10^10 -> 10^6': {
            start: 10_000_000_000,
            desc: 'Time in ms, to generate 1 million primes, after 10 billions'
        },
        '10^11 -> 10^6': {
            start: 100_000_000_000,
            desc: 'Time in ms, to generate 1 million primes, after 100 billions'
        },
        '10^12 -> 10^6': {
            start: 1_000_000_000_000,
            desc: 'Time in ms, to generate 1 million primes, after 1 trillion'
        },
        '10^13 -> 10^6': {
            start: 10_000_000_000_000,
            desc: 'Time in ms, to generate 1 million primes, after 10 trillions'
        },
        '10^14 -> 10^6': {
            start: 100_000_000_000_000,
            desc: 'Time in ms, to generate 1 million primes, after 100 trillions'
        },
        '10^15 -> 10^6': {
            start: 1_000_000_000_000_000,
            desc: 'Time in ms, to generate 1 million primes, after 1 quadrillion'
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
            'ms': Date.now() - start,
            'First Prime': f.value,
            'Description': tests[t].desc
        };
    }
    return result;
}
