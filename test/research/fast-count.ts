const WHLPRMS = new Uint32Array([2, 3, 5, 7, 11, 13, 17, 19]);

const FRSTSVPRM = 23;
const WHLODDCRC = 105;
const WHLHITS = 48;

const RESIDUES = new Uint32Array([
    23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 121, 127,
    131, 137, 139, 143, 149, 151, 157, 163, 167, 169, 173, 179,
    181, 187, 191, 193, 197, 199, 209, 211, 221, 223, 227, 229, 233]);

const WHLNDXS = new Uint8Array([
    0, 0, 0, 1, 2, 2, 2, 3, 3, 4, 5, 5, 6, 6, 6,
    7, 7, 7, 8, 9, 9, 9, 10, 10, 11, 12, 12, 12, 13, 13,
    14, 14, 14, 15, 15, 15, 15, 16, 16, 17, 18, 18, 19, 20, 20,
    21, 21, 21, 21, 22, 22, 22, 23, 23, 24, 24, 24, 25, 26, 26,
    27, 27, 27, 28, 29, 29, 29, 30, 30, 30, 31, 31, 32, 33, 33,
    34, 34, 34, 35, 36, 36, 36, 37, 37, 38, 39, 39, 40, 41, 41,
    41, 41, 41, 42, 43, 43, 43, 43, 43, 44, 45, 45, 46, 47, 47, 48]);

const WHLRNDUPS = new Uint8Array( // two rounds to avoid overflow, used in start address calcs...
    [0, 3, 3, 3, 4, 7, 7, 7, 9, 9, 10, 12, 12, 15, 15,
        15, 18, 18, 18, 19, 22, 22, 22, 24, 24, 25, 28, 28, 28, 30,
        30, 33, 33, 33, 37, 37, 37, 37, 39, 39, 40, 42, 42, 43, 45,
        45, 49, 49, 49, 49, 52, 52, 52, 54, 54, 57, 57, 57, 58, 60,
        60, 63, 63, 63, 64, 67, 67, 67, 70, 70, 70, 72, 72, 73, 75,
        75, 78, 78, 78, 79, 82, 82, 82, 84, 84, 85, 87, 87, 88, 93,
        93, 93, 93, 93, 94, 99, 99, 99, 99, 99, 100, 102, 102, 103, 105,
        105, 108, 108, 108, 109, 112, 112, 112, 114, 114, 115, 117, 117, 120, 120,
        120, 123, 123, 123, 124, 127, 127, 127, 129, 129, 130, 133, 133, 133, 135,
        135, 138, 138, 138, 142, 142, 142, 142, 144, 144, 145, 147, 147, 148, 150,
        150, 154, 154, 154, 154, 157, 157, 157, 159, 159, 162, 162, 162, 163, 165,
        165, 168, 168, 168, 169, 172, 172, 172, 175, 175, 175, 177, 177, 178, 180,
        180, 183, 183, 183, 184, 187, 187, 187, 189, 189, 190, 192, 192, 193, 198,
        198, 198, 198, 198, 199, 204, 204, 204, 204, 204, 205, 207, 207, 208, 210, 210]);

const WHLSTARTS = function WHLSTARTS() {
    let arr = new Array(WHLHITS);
    for (let i = 0; i < WHLHITS; ++i) arr[i] = new Uint16Array(WHLHITS * WHLHITS);
    for (let pi = 0; pi < WHLHITS; ++pi) {
        let mltsarr = new Uint16Array(WHLHITS);
        let p = RESIDUES[pi];
        let i = (p - FRSTSVPRM) >> 1;
        let s = ((i << 1) * (i + FRSTSVPRM) + (FRSTSVPRM * ((FRSTSVPRM - 1) >> 1))) | 0;
        // build array of relative mults and offsets to `s`...
        for (let ci = 0; ci < WHLHITS; ++ci) {
            let rmlt = (RESIDUES[((pi + ci) % WHLHITS) | 0] - RESIDUES[pi | 0]) >> 1;
            rmlt += rmlt < 0 ? WHLODDCRC : 0;
            let sn = s + p * rmlt;
            let snd = (sn / WHLODDCRC) | 0;
            let snm = (sn - snd * WHLODDCRC) | 0;
            mltsarr[WHLNDXS[snm]] = rmlt | 0; // new rmlts 0..209!
        }
        let ondx = (pi * WHLHITS) | 0;
        for (let si = 0; si < WHLHITS; ++si) {
            let s0 = (RESIDUES[si] - FRSTSVPRM) >> 1;
            let sm0 = mltsarr[si];
            for (let ci = 0; ci < WHLHITS; ++ci) {
                let smr = mltsarr[ci];
                let rmlt = smr < sm0 ? smr + WHLODDCRC - sm0 : smr - sm0;
                let sn = s0 + p * rmlt;
                let rofs = (sn / WHLODDCRC) | 0;
                // we take the multiplier times 2 so it multiplies by the odd wheel index...
                arr[ci][ondx + si] = ((rmlt << 9) | (rofs | 0)) >>> 0;
            }
        }
    }
    return arr;
}();

const PTRNLEN = (11 * 13 * 17 * 19);

const PTRNNDXDPRMS = new Int32Array([ // the wheel index plus the modulo index
    (-1 << 6) + 44, (-1 << 6) + 45, (-1 << 6) + 46, (-1 << 6) + 47]);

function makeSieveBuffer(szbits) { // round up to 32 bit boundary!
    let arr = new Array(WHLHITS);
    let sz = ((szbits + 31) >> 5) << 2;
    for (let ri = 0; ri < WHLHITS; ++ri) arr[ri] = new Uint8Array(sz);
    return arr;
}

function cullSieveBuffer(lwi, bps, prmstrts, sb) {
    let len = sb[0].length;
    let szbits = len << 3;
    let bplmt = len >> 1;
    let lowndx = lwi * WHLODDCRC;
    let nxti = (lwi + szbits) * WHLODDCRC;
    // set up prmstrts for use by each modulo residue bit plane...
    for (let pi = 0, bpslmt = bps.length; pi < bpslmt; ++pi) {
        let ndxdprm = bps[pi] | 0;
        let prmndx = ndxdprm & 0x3F;
        let pd = ndxdprm >> 6;
        let rsd = RESIDUES[prmndx] | 0;
        let bp = (pd * (WHLODDCRC << 1) + rsd) | 0;
        let i = (bp - FRSTSVPRM) / 2;
        let s = (i + i) * (i + FRSTSVPRM) + (FRSTSVPRM * ((FRSTSVPRM - 1) / 2));
        if (s >= nxti) {
            prmstrts[pi] = 0xFFFFFFFF >>> 0;
            break;
        } // enough base primes!
        if (s >= lowndx) s = (s - lowndx) | 0;
        else {
            let wp = (rsd - FRSTSVPRM) >>> 1;
            let r = ((lowndx - s) % (WHLODDCRC * bp)) >>> 0;
            s = r == 0
                ? 0 | 0
                : (bp * (WHLRNDUPS[(wp + ((r + bp - 1) / bp) | 0) | 0] - wp) - r) | 0;
        }
        let sd = (s / WHLODDCRC) | 0;
        let sn = WHLNDXS[(s - sd * WHLODDCRC) | 0];
        prmstrts[pi | 0] = ((sn << 26) | sd) >>> 0;
    }

    for (let ri = 0; ri < WHLHITS; ++ri) {
        let pln = sb[ri];
        let plnstrts = WHLSTARTS[ri];
        for (let pi = 0, bpslmt = bps.length; pi < bpslmt; ++pi) {
            let prmstrt = prmstrts[pi | 0] >>> 0;
            if (prmstrt == 0xFFFFFFFF) break;
            let ndxdprm = bps[pi | 0] | 0;
            let prmndx = ndxdprm & 0x3F;
            let pd = ndxdprm >> 6;
            let bp = (((pd * (WHLODDCRC << 1)) | 0) + RESIDUES[prmndx]) | 0;
            let sd = prmstrt & 0x3FFFFFF;
            let sn = prmstrt >>> 26;
            let adji = (prmndx * WHLHITS + sn) | 0;
            let adj = plnstrts[adji];
            sd += ((((adj >> 8) * pd) | 0) + (adj & 0xFF)) | 0;
            if (bp < bplmt) {
                for (let slmt = Math.min(szbits, sd + (bp << 3)) | 0; sd < slmt; sd += bp) {
                    let msk = (1 << (sd & 7)) >>> 0;

                    for (let c = sd >> 3; c < len; c += bp) pln[c] |= msk;
                }
            } else for (; sd < szbits; sd += bp) pln[sd >> 3] |= (1 << (sd & 7)) >>> 0;
        }
    }
}

const WHLPTRN = function () {
    const sb = makeSieveBuffer((PTRNLEN + 16384) << 3); // avoid overflow when filling!
    cullSieveBuffer(0, PTRNNDXDPRMS, new Uint32Array(PTRNNDXDPRMS.length), sb);
    return sb;
}();

const CLUT = function () {
    const arr = new Uint8Array(65536);
    for (let i = 0; i < 65536; ++i) {
        let nmbts = 0 | 0;
        let v = i;
        while (v > 0) {
            ++nmbts;
            v &= (v - 1) | 0;
        }
        arr[i] = nmbts | 0;
    }
    return arr;
}();

function countSieveBuffer(bitlmt, sb) {
    let lstwi = (bitlmt / WHLODDCRC) | 0;
    let lstri = WHLNDXS[(bitlmt - lstwi * WHLODDCRC) | 0];
    let lst = lstwi >> 5;
    let lstm = lstwi & 31;
    let count = (lst * 32 + 32) * WHLHITS;
    for (let ri = 0; ri < WHLHITS; ++ri) {
        let pln = new Uint32Array(sb[ri].buffer);
        for (let i = 0; i < lst; ++i) {
            let v = pln[i];
            count -= CLUT[v & 0xFFFF];
            count -= CLUT[v >>> 16];
        }
        let msk = 0xFFFFFFFF << lstm;
        if (ri <= lstri) msk <<= 1;
        let v = pln[lst] | msk;
        count -= CLUT[v & 0xFFFF];
        count -= CLUT[v >>> 16];
    }
    return count;
}

function fillSieveBuffer(lwi, sb) {
    let len = sb[0].length;
    let cpysz = len > 16384 ? 16384 : len;
    let mod0 = lwi / 8;
    for (let ri = 0; ri < WHLHITS; ++ri) {
        for (let i = 0; i < len; i += 16384) {
            let mod = ((mod0 + i) % PTRNLEN) | 0;
            sb[ri].set(WHLPTRN[ri].subarray(mod, (mod + cpysz) | 0), i);
        }
    }
}

function doit(LIMIT, bufferSize) {
    if (!Number.isInteger(LIMIT) || (LIMIT < 0) || (LIMIT > 1e15)) {
        // document.getElementById('output').innerText = 'Top limit must be an integer between 0 and 9e15!';
        return;
    }
    const SIEVEBUFFERSZ = bufferSize;
    let startx = +Date.now();
    let count = 0;
    for (let i = 0; i < WHLPRMS.length; ++i) {
        if (WHLPRMS[i] > LIMIT) break;
        ++count;
    }
    if (LIMIT >= FRSTSVPRM) {
        const cmpsts = makeSieveBuffer(SIEVEBUFFERSZ);
        const bparr = function () {
            let szbits = (((((((Math.sqrt(LIMIT) | 0) - 23) >> 1) + WHLODDCRC - 1) / WHLODDCRC)
                + 31) >> 5) << 5;
            let cmpsts = makeSieveBuffer(szbits);
            fillSieveBuffer(0, cmpsts);
            let ndxdrsds = new Int32Array(2 * WHLHITS);
            for (let i = 0; i < ndxdrsds.length; ++i)
                ndxdrsds[i] = ((i < WHLHITS ? 0 : 64) + (i % WHLHITS)) >>> 0;
            cullSieveBuffer(0, ndxdrsds, new Uint32Array(ndxdrsds.length), cmpsts);
            let len = countSieveBuffer(szbits * WHLODDCRC - 1, cmpsts);
            let ndxdprms = new Uint32Array(len);
            let j = 0;
            for (let i = 0; i < szbits; ++i)
                for (let ri = 0; ri < WHLHITS; ++ri)
                    if ((cmpsts[ri][i >> 3] & (1 << (i & 7))) == 0) {
                        ndxdprms[j++] = ((i << 6) + ri) >>> 0;
                    }
            return ndxdprms;
        }();
        let lwilmt = (LIMIT - FRSTSVPRM) / 2 / WHLODDCRC;
        let strts = new Uint32Array(bparr.length);
        let lwi = 0;
        const pgfnc = function () {
            const smlllmt = lwi + 4194304;
            const lmt = (smlllmt < lwilmt) ? smlllmt : lwilmt;
            for (; lwi <= lmt; lwi += SIEVEBUFFERSZ) {
                const nxti = lwi + SIEVEBUFFERSZ;
                fillSieveBuffer(lwi, cmpsts);
                cullSieveBuffer(lwi, bparr, strts, cmpsts);
                if (nxti <= lwilmt) count += countSieveBuffer(SIEVEBUFFERSZ * WHLODDCRC - 1, cmpsts);
                else count += countSieveBuffer((LIMIT - FRSTSVPRM) / 2 - lwi * WHLODDCRC, cmpsts);
            }
            if (lwi <= lwilmt) {
                setTimeout(pgfnc, 7);
            } else {

                const elpsdx = +Date.now() - startx;
                console.log(`Found ${count.toLocaleString()} primes up to ${LIMIT} in ${elpsdx}ms`);
            }
        };
        pgfnc();
    }
}

// export const maxPrime = 9_007_199_254_740_881;

// {start, end, max}
// max is to let us stop the count automatically when it is reached.

(function test() {
    doit(1_000_000, 1048576);
    // doit(100_000_000, 1048576);
})();
