import {testSieveInt} from './tests/sieve-int';
import {testSieveIntBoost} from './tests/sieve-int-boost';
import {testSieveIntStart} from './tests/sieve-int-start';
import {testIsPrime} from './tests/is-prime';
import {testCountPrimes} from './tests/count-primes';

const {cpus, version} = require('os');

const colors = {
    reset: '\x1b[0m',
    cyan: '\x1b[36m',
    red: '\x1b[31m'
};

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
            const isLast = i === argv.length - 1;
            runTest(argv[i], isLast);
        } while (++i < argv.length);
    } else {
        // run all benchmarks
        const keys = Object.keys(commands);
        keys.forEach((k, idx) => {
            const isLast = idx === keys.length - 1;
            runTest(k, isLast);
        });
    }

    const duration = Math.ceil((Date.now() - start) / 1000);

    const {model, speed} = cpus()[0];
    const cpu = `${model.trim()}, ${speed}Mhz`;
    console.log(colors.cyan, `\nDuration: ${duration}s\nNodeJS: ${process.version}\nCPU: ${cpu}\nOS: ${version()}\n`, colors.reset);

    function runTest(testName: string, isLast: boolean): void {
        if (testName in commands) {
            console.log(colors.cyan, `Benchmarking ${JSON.stringify(testName)}...`, colors.reset);
            const result = commands[testName]();
            if (Object.keys(result).length) {
                console.table(result);
                if (!isLast) {
                    console.log();
                }
            } else {
                console.log('Nothing :(\n');
            }
        } else {
            console.error(colors.red, `Unknown test ${JSON.stringify(testName)}\n`, colors.reset);
            process.exit(0);
        }
    }
})();
