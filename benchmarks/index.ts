import {testSieveInt} from './tests/sieve-int';
import {testSieveIntBoost} from './tests/sieve-int-boost';
import {testSieveIntStart} from './tests/sieve-int-start';
import {testIsPrime} from './tests/is-prime';
import {testCountPrimes} from './tests/count-primes';

const {cpus, version} = require('os');

(function () {
    // tslint:disable:no-console

    const commands: { [name: string]: any } = {
        sieveInt() {
            return testSieveInt();
        },
        sieveIntBoost() {
            return testSieveIntBoost();
        },
        sieveIntStart() {
            return testSieveIntStart();
        },
        isPrime() {
            return testIsPrime();
        },
        countPrimes() {
            return testCountPrimes();
        }
    };

    const {argv} = process;
    const start = Date.now();
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

    const duration = Math.ceil((Date.now() - start) / 1000);

    const {model, speed} = cpus()[0];
    const cpu = `${model.trim()}, ${speed}Mhz`;
    console.log(`Duration: ${duration}s\nNodeJS: ${process.version}\nCPU: ${cpu}\nOS: ${version()}\n`);

    function runTest(testName: string): void {
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
