import {ITestInput, ITestResult} from './common';
import {generatePrimes} from '../../src/';

export function testSieveIntBoost(): ITestResult {
    const tests: ITestInput = {
        '1e4': {
            max: 1e4,
            desc: 'Generate the first 10,000 primes'
        },
        '1e5': {
            max: 1e5,
            desc: 'Generate the first 100,000 primes'
        },
        '1e6': {
            max: 1e6,
            desc: 'Generate the first million primes'
        },
        '1e7': {
            max: 1e7,
            desc: 'Generate the first 10 million primes'
        },
        '1e8': {
            max: 1e8,
            desc: 'Generate the first 100 million primes'
        }
    };
    const result: any = {};
    for (const t in tests) {
        const maxPrimes = tests[t].max;
        const start = Date.now();
        const i = generatePrimes({boost: maxPrimes});
        let count = 0, p;
        do {
            p = i.next();
        } while (++count < maxPrimes);
        result[t] = {
            'description': tests[t].desc,
            'ms': Date.now() - start,
            'last prime': p.value
        };
    }
    return result;
}
