function soeOddPrimesTo(limit) {
    var lmti = (limit - 3) >> 1; // bit index for limit value
    var sz = (lmti >> 3) + 1; // size in bytes
    var cmpsts = new Uint16Array(sz); // index 0 represents 3
    // no need to zero above composites array; zeroed on creation...
    for (var i = 0; ; ++i) {
        var p = i + i + 3; // the square index is (p * p - 3) / 2 but we
        var sqri = (i << 1) * (i + 3) + 3; // calculate start index directly
        if (sqri > lmti) break; // while p is < square root of limit -> cull...
        // following does bit unpacking to test the prime bit...
        // 0/1 is false/true; false means prime...
        // use asm.js with the shifts to make uint8's for some extra efficiency...
        if ((cmpsts[i >> 3] & ((1 >>> 0) << (i & 7))) == 0 >>> 0)
            for (var c = sqri; c <= lmti; c += p) // set true for composites...
                cmpsts[c >> 3] |= (1 >>> 0) << (c & 7); // masking in the bit
    }
    var bi = -1;
    return function () { // return function to return successive primes per call...
        if (bi < 0) {
            ++bi;
        } // the only even prime is a special case
        while (bi <= lmti && (cmpsts[bi >> 3] & ((1 >>> 0) << (bi & 7))) != 0 >>> 0) ++bi;
        if (bi > lmti) return null; // return null following the last prime
        return (bi++ << 1) + 3; // else calculate the prime from the index
    };
}

function* generate1(limit: number): IterableIterator<number> {
    const gen = soeOddPrimesTo(limit);
    let a;
    do {
        a = gen();
        if (a) {
            yield a;
        }
    } while (a !== null);
}

const start = Date.now();
const g = generate1(2_000_000_000);
const maxCount = 1000;

let count = 0;
let a, last;
do {
    a = g.next();
    if (!a.done) {
        last = a.value;
        count++;
    }
} while (!a.done && count < maxCount);

/*
* It works, but not great, as it pre-allocates full-length array memory, which is bad!!!
* */

console.log(`Duration: ${Date.now() - start}, count: ${count}, last prime: ${last}`);
