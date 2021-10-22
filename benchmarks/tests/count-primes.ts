import {ITestInput, ITestResult} from './common';
import {countPrimes} from '../../src';

export function testCountPrimes(): ITestResult {
    const tests: ITestInput = {
        '1e6': {
            x: 1e6,
            desc: 'Time to count primes in 1 million'
        },
        '1e7': {
            x: 1e7,
            desc: 'Time to count primes in 10 millions'
        },
        '1e8': {
            x: 1e8,
            desc: 'Time to count primes in 100 millions'
        },
        '1e9': {
            x: 1e9,
            desc: 'Time to count primes in 1 billion'
        },
        '1e10': {
            x: 1e10,
            desc: 'Time to count primes in 10 billions'
        },
        '1e11': {
            x: 1e11,
            desc: 'Time to count primes in 100 billions'
        },/*
        '1e12': {
            x: 1e12,
            desc: 'Time to count primes in 1 trillion'
        },
        '1e13': {
            x: 1e13,
            desc: 'Time to count primes in 10 trillions'
        }*/
    };

    const result: any = {};
    for (const t in tests) {
        const {x, desc} = tests[t];
        const start = Date.now();
        const count = countPrimes(x);
        result[t] = {
            'description': desc,
            'ms': Date.now() - start,
            'count': count
        };
    }
    return result;
}
