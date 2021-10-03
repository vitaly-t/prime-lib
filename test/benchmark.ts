// tslint:disable:no-console

interface ITestResult {
    [name: string]: number;
}

function testSieveInt(): ITestResult {
    console.log('Running test: testSieveInt...');
    return {};
}

function testSieveIntStart(): ITestResult {
    console.log('Running test: testSieveIntStart...');
    return {};
}

function testSieveBigInt(): ITestResult {
    console.log('Running test: testSieveBigInt...');
    return {};
}

function testSieveBigIntStart(): ITestResult {
    console.log('Running test: testSieveBigIntStart...');
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
            printResult(runTest(process.argv[i]));
        } while (++i < process.argv.length);
    } else {
        printResult(runTest('all'));
    }

    function runTest(testName: string): ITestResult | ITestResult[] {
        if (testName in commands) {
            return commands[testName]();
        }
        console.error(`Unknown test ${JSON.stringify(testName)}\n`);
        process.exit(0);
    }

    function printResult(result: ITestResult | ITestResult[]) {
        console.table(result, ['duration (ms)']);
    }
})();
