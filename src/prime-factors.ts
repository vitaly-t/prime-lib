/**
 * Calculates prime factorization of a number.
 *
 * Works for 2 <= x <= (2^53 - 1 = 9_007_199_254_740_991 = Number.MAX_SAFE_INTEGER);
 * throws error when x type is wrong or when outside the range.
 */
export function primeFactors(x: number): number[] {
    if (x >= 2 && x <= Number.MAX_SAFE_INTEGER) {
        cfg.result.length = 0;
        cfg.numLeft = x;
        let done, p = 0;
        const {length} = cfg.lowPrimes;
        for (p; p < length; p++) {
            if (!testFact(cfg.lowPrimes[p])) {
                done = true;
                break;
            }
        }
        if (!done) {
            let fact = (((cfg.lowPrimes[p - 1] + 5) / 6) << 0) * 6 - 1;
            while (testFact(fact += 2) && testFact(fact += 4));
        }
        if (cfg.numLeft !== 1) {
            addFact(cfg.numLeft, 1);
        }
        return [...cfg.result];
    }
    const badValue = JSON.stringify(x);
    if (x < 2 || x > Number.MAX_SAFE_INTEGER) {
        throw new RangeError(`Value ${badValue} is outside range (2 <= x <= ${Number.MAX_SAFE_INTEGER})`);
    }
    throw new TypeError(`Invalid value ${badValue} specified.`);
}

function testFact(fact: number): boolean {
    let power = 0;
    while (cfg.numLeft % fact === 0) {
        power++;
        cfg.numLeft /= fact;
    }
    if (power !== 0) {
        addFact(fact, power);
    }
    return cfg.numLeft / fact > fact;
}

function addFact(fact: number, power: number): void {
    for (let i = 0; i < power; i++) {
        cfg.result.push(fact);
    }
}

const cfg = {
    result: new Array<number>(),
    numLeft: 0,
    lowPrimes: [ // first 100 primes
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
        101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199,
        211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331,
        337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457,
        461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541
    ]
};
