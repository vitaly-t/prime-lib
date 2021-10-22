import {generatePrimes} from '../../src';
import {ITestInput, ITestResult} from './common';

export function testSieveInt(): ITestResult {
    const tests: ITestInput = {
        '10^4': {
            max: 10_000,
            desc: 'Time in ms, to generate the first 10,000 primes'
        },
        '10^5': {
            max: 100_000,
            desc: 'Time in ms, to generate the first 100,000 primes'
        },
        '10^6': {
            max: 1_000_000,
            desc: 'Time in ms, to generate the first million primes'
        },
        '10^7': {
            max: 10_000_000,
            desc: 'Time in ms, to generate the first 10 million primes'
        },
        '10^8': {
            max: 100_000_000,
            desc: 'Time in ms, to generate the first 100 million primes'
        }
    };
    const result: any = {};
    for (const t in tests) {
        const i = generatePrimes();
        const maxPrimes = tests[t].max;
        const start = Date.now();
        let count = 0, p;
        do {
            p = i.next();
        } while (++count < maxPrimes);
        result[t] = {
            'ms': Date.now() - start,
            'Last Prime': p.value,
            'Description': tests[t].desc
        };
    }
    return result;
}
