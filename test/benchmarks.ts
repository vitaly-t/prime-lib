import {sieveInt, sieveIntStart} from '../src/sieve';
import {sieveBigInt, sieveBigIntStart} from '../dist/sieve';

interface ITestInput {
    [name: string]: { [value: string]: any };
}

interface ITestResult {
    [name: string]: { [value: string]: any };
}

function testSieveInt(): ITestResult {
    const tests: ITestInput = {
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
        const i = sieveInt();
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

function testSieveIntStart(): ITestResult {
    const tests: ITestInput = {
        '10^9': {
            start: 1_000_000_000,
            desc: 'Time in ms, to generate 1 million primes after 1 billion'
        },
        '10^10': {
            start: 10_000_000_000,
            desc: 'Time in ms, to generate 1 million primes after 10 billions'
        },
        '10^11': {
            start: 100_000_000_000,
            desc: 'Time in ms, to generate 1 million primes after 100 billions'
        },
        '10^12': {
            start: 1_000_000_000_000,
            desc: 'Time in ms, to generate 1 million primes after 1 trillion'
        },
        '10^13': {
            start: 10_000_000_000_000,
            desc: 'Time in ms, to generate 1 million primes after 10 trillions'
        },
        '10^14': {
            start: 100_000_000_000_000,
            desc: 'Time in ms, to generate 1 million primes after 100 trillions'
        },
        '10^15': {
            start: 1_000_000_000_000_000,
            desc: 'Time in ms, to generate 1 million primes after 1 quadrillion'
        }
        // NOTE: Maximum prime is 9_007_199_254_740_881, i.e. less then 10^16
    };
    const result: any = {};
    for (const t in tests) {
        const i = sieveIntStart(tests[t].start);
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

function testSieveBigInt(): ITestResult {
    const tests: ITestInput = {
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
        const i = sieveBigInt();
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

function testSieveBigIntStart(): ITestResult {
    const tests: ITestInput = {
        '10^9': {
            start: 1_000_000_000n,
            limit: 1_000_000,
            desc: 'Time in ms, to generate 1 million primes after 1 billion'
        },
        '10^10': {
            start: 10_000_000_000n,
            limit: 1_000_000,
            desc: 'Time in ms, to generate 1 million primes after 10 billions'
        },
        '10^11': {
            start: 100_000_000_000n,
            limit: 1_000_000,
            desc: 'Time in ms, to generate 1 million primes after 100 billions'
        },
        '10^12': {
            start: 1_000_000_000_000n,
            limit: 1_000_000,
            desc: 'Time in ms, to generate 1 million primes after 1 trillion'
        },
        '10^13': {
            start: 10_000_000_000_000n,
            limit: 1_000_000,
            desc: 'Time in ms, to generate 1 million primes after 10 trillions'
        },
        '10^14': {
            start: 100_000_000_000_000n,
            limit: 1_000_000,
            desc: 'Time in ms, to generate 1 million primes after 100 trillions'
        },
        '10^15': {
            start: 1_000_000_000_000_000n,
            limit: 1_000_000,
            desc: 'Time in ms, to generate 1 million primes after 1 quadrillion'
        },
        '10^16': {
            start: 10_000_000_000_000_000n,
            limit: 1_000,
            desc: 'Time in ms, to generate 1000 primes after 10 quadrillions'
        },
        /*
        TODO: Fails with 'out of range' error, need to fix it.
        '10^17': {
            start: 100_000_000_000_000_000n,
            limit: 1_000,
            desc: 'Time in ms, to generate 1000 primes after 100 quadrillions'
        }*/
    };
    const result: any = {};
    for (const t in tests) {
        const i = sieveBigIntStart(tests[t].start);
        const {limit} = tests[t];
        const start = Date.now();
        let count = 0, p, f;
        do {
            p = i.next();
            f = f || p;
        } while (++count < limit);
        result[t] = {
            'ms': Date.now() - start,
            'First Prime': f.value,
            'Description': tests[t].desc
        };
    }
    return result;
}

(function () {
    const commands: { [name: string]: any } = {
        sieveInt() {
            return testSieveInt();
        },
        sieveIntStart() {
            return testSieveIntStart();
        },
        sieveBigInt() {
            return testSieveBigInt();
        },
        sieveBigIntStart() {
            return testSieveBigIntStart();
        }
    };

    const {argv} = process;
    if (argv.length > 2) {
        let i = 2;
        do {
            runTest(argv[i]);
        } while (++i < argv.length);
    } else {
        // run all benchmarks
        for (const c in commands) {
            runTest(c);
        }
    }

    function runTest(testName: string): void {
        // tslint:disable:no-console

        if (testName in commands) {
            console.log(`*** Benchmarking ${JSON.stringify(testName)}...`);
            const result = commands[testName]();
            if (Object.keys(result).length) {
                console.table(result);
                console.log();
            } else {
                console.log('Nothing :(\n');
            }
        } else {
            console.error(`Unknown test ${JSON.stringify(testName)}\n`);
            process.exit(0);
        }
    }
})();
