// JavaScript implementation of Page Segmented Sieve of Eratosthenes...
// This takes almost no memory as it is bit-packed and odds-only,
// and only uses memory proportional to the square root of the range;
// it is also quite fast for large ranges due to imrproved cache associativity...

"use strict";

const PGSZBYTES = 16384 * 8;
const PGSZBITS = PGSZBYTES * 8;
const ZEROSPTRN = new Uint8Array(PGSZBYTES);

function soePages(bitsz) {
    let len = bitsz >> 3;
    let bpa = [];
    let buf =  new Uint8Array(len);
    let lowi = 0;
    let gen;
    return function () {
        let nxt = 3 + ((lowi + bitsz) << 1); // just beyond the current page
        buf.set(ZEROSPTRN.subarray(0,buf.length)); // clear sieve array!
        if (lowi <= 0 && bitsz < 131072) { // special culling for first page as no base primes yet:
            for (let i = 0, p = 3, sqr = 9; sqr < nxt; ++i, p += 2, sqr = p * p)
                if ((buf[i >> 3] & (1 << (i & 7))) === 0)
                    for (let j = (sqr - 3) >> 1; j < 131072; j += p)
                        buf[j >> 3] |= 1 << (j & 7);
        } else { // other than the first "zeroth" page:
            if (!bpa.length) { // if this is the first page after the zero one:
                gen = basePrimes(); // initialize separate base primes stream:
                bpa.push(gen()); // keep the next prime (3 in this case)
            }
            // get enough base primes for the page range...
            for (let p = bpa[bpa.length - 1], sqr = p * p; sqr < nxt;
                 p = gen(), bpa.push(p), sqr = p * p);
            for (let i = 0; i < bpa.length; ++i) { // for each base prime in the array
                let p = bpa[i] >>> 0;
                let s = (p * p - 3) >>> 1; // compute the start index of the prime squared
                if (s >= lowi) // adjust start index based on page lower limit...
                    s -= lowi;
                else { // for the case where this isn't the first prime squared instance
                    let r = (lowi - s) % p;
                    s = (r != 0) ? p - r : 0;
                }
                if (p <= 32) {
                    for (let slmt = Math.min(bitsz, s + (p << 3)); s < slmt; s += p) {
                        let msk = ((1 >>> 0) << (s & 7)) >>> 0;
                        for (let c = s >>> 3, clmt = bitsz >= 131072 ? len : len; c < clmt | 0; c += p)
                            buf[c] |= msk;
                    }
                }
                else
                    // inner tight composite culling loop for given prime number across page
                    for (let slmt = bitsz >= 131072 ? bitsz : bitsz; s < slmt; s += p)
                        buf[s >> 3] |=  ((1 >>> 0) << (s & 7)) >>> 0;
            }
        }
        let olowi = lowi;
        lowi += bitsz;
        return [olowi, buf];
    };
}

function basePrimes() {
    var bi = 0;
    var lowi;
    var buf;
    var len;
    var gen = soePages(256);
    return function () {
        while (true) {
            if (bi < 1) {
                var pg = gen();
                lowi = pg[0];
                buf = pg[1];
                len = buf.length << 3;
            }
            //find next marker still with prime status
            while (bi < len && buf[bi >> 3] & ((1 >>> 0) << (bi & 7))) bi++;
            if (bi < len) // within buffer: output computed prime
                return 3 + ((lowi + bi++) << 1);
            // beyond buffer range: advance buffer
            bi = 0;
            lowi += len; // and recursively loop to make a new page buffer
        }
    };
}

const CLUT = function () {
    let arr = new Uint8Array(65536);
    for (let i = 0; i < 65536; ++i) {
        let nmbts = 0|0; let v = i;
        while (v > 0) { ++nmbts; v &= (v - 1)|0; }
        arr[i] = nmbts|0;
    }
    return arr;
}();

function countPage(bitlmt, sb) {
    let lst = bitlmt >> 5;
    let pg = new Uint32Array(sb.buffer);
    let cnt = (lst << 5) + 32;
    for (let i = 0 | 0; i < lst; ++i) {
        let v = pg[i]; cnt -= CLUT[v & 0xFFFF]; cnt -= CLUT[v >>> 16];
    }
    var n = pg[lst] | (0xFFFFFFFE << (bitlmt & 31));
    cnt -= CLUT[n & 0xFFFF]; cnt -= CLUT[n >>> 16];
    return cnt;
}

function countSoEPrimesTo(limit) {
    if (limit < 3) {
        if (limit < 2) return 0;
        return 1;
    }
    var cnt = 1;
    var lmti = (limit - 3) >>> 1;
    var lowi;
    var buf;
    var len;
    var nxti;
    var gen = soePages(PGSZBITS);
    while (true) {
        var pg = gen();
        lowi = pg[0];
        buf = pg[1];
        len = buf.length << 3;
        nxti = lowi + len;
        if (nxti > lmti) {
            cnt += countPage(lmti - lowi, buf);
            break;
        }
        cnt += countPage(len - 1, buf);
    }
    return cnt;
}

var limit = 1000000000; // sieve to this limit...
var start = +new Date();
var answr = countSoEPrimesTo(limit);
var elpsd = +new Date() - start;
console.log("Found " + answr + " primes up to " + limit + " in " + elpsd + " milliseconds.");