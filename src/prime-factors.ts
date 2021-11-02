/**
 * Calculates prime factorization of a number.
 *
 * Works up to 2^53 - 1 = 9_007_199_254_740_991
 *
 * TODO: This is a draft for high-performance calculation.
 *       It still needs a bit of refactoring + tests.
 */
export function primeFactors(x: number): number[] {
    cfg.result = [];
    if (x > cfg.max) {
        return cfg.result;
    }
    cfg.numLeft = x;
    if (cfg.numLeft === 0 || cfg.numLeft === 1) {
        return cfg.result;
    }
    let doneQ = false, p = 0;
    for (p; p < cfg.lowPrimeN; p++) {
        if (!testFact(cfg.lowPrimes[p])) {
            doneQ = true;
            break;
        }
    }
    if (!doneQ) {
        let fact = (((cfg.lowPrimes[p - 1] + 5) / 6) << 0) * 6 - 1;
        while (true) {
            if (!testFact(fact)) {
                break;
            }
            fact += 2;
            if (!testFact(fact)) {
                break;
            }
            fact += 4;
        }
    }
    if (cfg.numLeft !== 1) {
        addFact(cfg.numLeft, 1);
    }
    return cfg.result;
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
    result: [] as number[],
    max: 9007199254740991, // = 2^53 - 1
    numLeft: 0,
    lowPrimeN: 100,
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
