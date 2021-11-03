/**
 * Calculates prime factorization of a number.
 *
 * Works for 2 <= x <= (2^53 - 1 = 9_007_199_254_740_991 = Number.MAX_SAFE_INTEGER);
 * throws error when x is outside the range.
 */
export function primeFactors(x: number): number[] {
    if (x >= 2 && x <= Number.MAX_SAFE_INTEGER) {
        cfg.result.length = 0;
        cfg.numLeft = x;
        let done = false, p = 0;
        for (p; p < 100; p++) {
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
        return cfg.result;
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
        cfg.numLeft = cfg.numLeft / fact;
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
    lowPrimes: [
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109,
        113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239,
        241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379,
        383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521,
        523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661,
        673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827,
        829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991,
        997, 1009, 1013, 1019, 1021, 1031, 1033, 1039
    ]
};
