import {sieveInt} from '../dist/sieve';

interface ITestResult {
    [name: string]: any;
}

function testSieveInt(): ITestResult {
    const tests = {
        '1mln': {
            max: 1_000_000,
            desc: 'Time in milliseconds to generate the first million primes'
        },
        '10mln': {
            max: 10_000_000,
            desc: 'Time in milliseconds to generate the first 10 million primes'
        },
        '100mln': {
            max: 100_000_000,
            desc: 'Time in milliseconds to generate the first 100 million primes'
        }
    };
    const result = {};
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
    // TODO: Add some tests here
    return {};
}

function testSieveBigInt(): ITestResult {
    // TODO: Add some tests here
    return {};
}

function testSieveBigIntStart(): ITestResult {
    // TODO: Add some tests here
    return {};
}

(function () {
    const commands = {
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
        },
        all() {
            return [
                testSieveInt(),
                testSieveIntStart(),
                testSieveBigInt(),
                testSieveBigIntStart()
            ];
        }
    };

    if (process.argv.length > 2) {
        let i = 2;
        do {
            runTest(process.argv[i]);
        } while (++i < process.argv.length);
    } else {
        runTest('all');
    }

    function runTest(testName: string): void {
        // tslint:disable:no-console

        if (testName in commands) {
            if (testName === 'all') {
                console.log('*** Running all tests...');
            } else {
                console.log(`*** Running tests for ${JSON.stringify(testName)}...`);
            }
            const result = commands[testName]();
            console.table(result);
        } else {
            console.error(`Unknown test ${JSON.stringify(testName)}\n`);
            process.exit(0);
        }
    }
})();