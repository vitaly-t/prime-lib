/**
 * Calculates prime factorization of a number.
 *
 * Works up to the maximum of 9007199254740991
 *
 * This is a draft for high-performance calculation that passes all tests.
 * It just needs a bit of good refactoring.
 */

let numLeft: number;

const my = {
    FArr: new Array<number>(),
    MAX: 9007199254740991,
    lowPrimes: getLowPrimes(),
    lowPrimeN: 100
};

export function primeFactors(TheNum: number) {
    my.FArr = [];
    if (TheNum > my.MAX) {
        return my.FArr;
    }
    numLeft = TheNum;
    if (numLeft === 0 || numLeft === 1) {
        return my.FArr;
    }
    let doneQ = false;
    for (var p = 0; p < my.lowPrimeN; p++) {
        if (!testFact(my.lowPrimes[p])) {
            doneQ = true;
            break;
        }
    }
    if (!doneQ) {
        let fact = (((my.lowPrimes[p - 1] + 5) / 6) << 0) * 6 - 1;
        while (true) {
            if (!testFact(fact)) break;
            fact += 2;
            if (!testFact(fact)) break;
            fact += 4;
        }
    }
    if (numLeft !== 1) addFact(numLeft, 1);

    return my.FArr;
}

function testFact(fact: number): boolean {
    let power = 0;
    while (numLeft % fact === 0) {
        power++;
        numLeft = numLeft / fact;
    }
    if (power !== 0) {
        addFact(fact, power);
    }
    return numLeft / fact > fact;
}

function addFact(fact: number, power: number) {
    for (let i = 0; i < power; i++) {
        my.FArr.push(fact);
    }
}

function getLowPrimes() {
    return [
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109,
        113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239,
        241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379,
        383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521,
        523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661,
        673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827,
        829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991,
        997, 1009, 1013, 1019, 1021, 1031, 1033, 1039
    ];
}
