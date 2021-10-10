function soeOddPrimesTo(bufferLimit: number) {
    const lmti = (bufferLimit - 3) >> 1;
    const sz = (lmti >> 3) + 1;
    const cmpSts = new Uint8Array(sz);
    for (let i = 0; ; ++i) {
        const p = i + i + 3;
        const sqri = (i << 1) * (i + 3) + 3;
        if (sqri > lmti) {
            break;
        }
        if ((cmpSts[i >> 3] & ((1 >>> 0) << (i & 7))) == 0 >>> 0) {
            for (let c = sqri; c <= lmti; c += p) {
                cmpSts[c >> 3] |= (1 >>> 0) << (c & 7);
            }
        }
    }
    let bi = -1;
    return function () {
        if (bi < 0) {
            ++bi;
        }
        while (bi <= lmti && (cmpSts[bi >> 3] & ((1 >>> 0) << (bi & 7))) != 0 >>> 0) {
            ++bi;
        }
        if (bi > lmti) {
            return null;
        }
        return (bi++ << 1) + 3;
    };
}

/**
 * Maximum number of primes for which we can allocate memory to boost performance.
 *
 * To generate quickly 100mln primes we will be allocating about 130MB of RAM.
 * Going beyond that will overload any browser or NodeJS.
 */
const maxLimit = 100_000_000;

function* generateSieveBoost(limit: number): IterableIterator<number> {
    if (limit < 1) {
        return;
    }
    const maxCount = limit > maxLimit ? maxLimit : limit;
    const bufferLimit = Math.floor(2.3 * maxCount * (Math.log10(maxCount) + 1));
    yield 2;
    const gen = soeOddPrimesTo(bufferLimit);
    let p, count = 0;
    while (++count < maxCount && (p = gen())) {
        yield p;
    }
}

// number of zeros, multiplied by 2 plus 0.5: 2.5, 4.5, 6.5, 9, 11,

// 10: 4, 2.5
// 100: 25, 4
// 1_000: 168, 5.95
// 10_000: 1229, 8.14
// 100_000: 9592, 10.4
// 1mln: 78498, 12.7
// 10mln: 664_579, 15
// 100mln: 5_761_455, 17.3
// 1bln: 50_747_534, 19.7
// 2.1bln: 103mln, 20.4

// 10bln: 70_462_980, then stops working (21)

const start = Date.now();
const g = generateSieveBoost(1_000_000_00);

let count = 0;
let a, last;
do {
    a = g.next();
    if (!a.done) {
        // console.log(a.value);
        last = a.value;
        count++;
    }
} while (!a.done);

/*
* It works, but not great, as it pre-allocates full-length array memory, which is bad!!!
* */

console.log(`Duration: ${Date.now() - start}, count: ${count}, last prime: ${last}`);
