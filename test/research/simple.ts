// from here: https://jsfiddle.net/KARZw/

/*
export function* soe_original(n): IterableIterator<number> {
    // Eratosthenes algorithm to find all primes under n
    const upperLimit = Math.sqrt(n);
    const array = new Uint8Array(n);

    // Make an array from 2 to (n - 1)
    for (let i = 0; i < n; i++) {
        array[i] = 1;
    }

    // Remove multiples of primes starting from 2, 3, 5,...
    for (let i = 2; i <= upperLimit; i++) {
        if (array[i]) {
            for (let j = i * i; j < n; j += i) {
                array[j] = 0;
            }
        }
    }

    for (let i = 2; i < n; i++) {
        if (array[i]) {
            yield i;
        }
    }
}*/

function getBit(source: Uint32Array, index: number) {
    const srcIndex = index >>> 5;
    const bitMask = 1 << index % 32;
    return source[srcIndex] & bitMask;
    // arr[index >>> 5] & 1 << index % 32
}

function resetBit(source: Uint32Array, index: number) {
    const srcIndex = index >>> 5;
    const bitMask = ~(1 << index % 32);
    source[srcIndex] &= bitMask;
    // arr[index >>> 5] &= ~(1 << index % 32)
}

export function* soe_compressed(n): IterableIterator<number> {
    const top = Math.ceil(n / 32);

    const upperLimit = Math.sqrt(n);
    const arr = new Uint32Array(top);

    for (let i = 0; i < top; i++) {
        arr[i] = 0xFFFF_FFFF;
    }

    for (let i = 2; i <= upperLimit; i++) {
        if (arr[i >>> 5] & 1 << i % 32) {
            for (let j = i * i; j < n; j += i) {
                arr[j >>> 5] &= ~(1 << j % 32);
            }
        }
    }

    for (let i = 2; i < n; i++) {
        if (arr[i >>> 5] & 1 << i % 32) {
            yield i;
        }
    }
}

function count1s32(i) {
    i = i - ((i >> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
    i = (i + (i >> 4)) & 0x0f0f0f0f;
    i = i + (i >> 8);
    i = i + (i >> 16);
    return i & 0x3f;
}

function bitCount(n) {
    n = n - ((n >> 1) & 0x55555555);
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
    return ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24;
}

function countSet3(n) {
    // 0xff is hexadecimal representation of 8 set bits.
    let res = n & 0xff;
    n = n >> 8;
    res = res + n & 0xff;
    n = n >> 8;
    res = res + n & 0xff;
    n = n >> 8;
    res = res + n & 0xff;
    return res;
}

function NumberOfSetBits(i) {
    i = i - ((i >> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
    return (((i + (i >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24;
}

export function soe_compressed_count(n): number {
    const top = Math.ceil(n / 32);

    const upperLimit = Math.sqrt(n);
    const arr = new Uint32Array(top);
    let count = n;

    for (let i = 0; i < top; i++) {
        arr[i] = 0xFFFF_FFFF;
    }

    for (let i = 2; i <= upperLimit; i++) {
        if (arr[i >>> 5] & 1 << i % 32) {
            for (let j = i * i; j < n; j += i) {
                arr[j >>> 5] &= ~(1 << j % 32);
            }
        }
    }

    for (let i = 2; i < n; i++) {
        if (arr[i >>> 5] & 1 << i % 32) {
            count ++;
        }
    }

    return count;
}

const start = Date.now();

/*
// 100_000_000 => 5_761_455
// 100 => 25
// 10 => 4
const i = soe_compressed(4_100_000_000);
let a, count = 0;
do {
    a = i.next();
    if (!a.done) {
        count++;
    }
} while (!a.done);

console.log(`Duration: ${Date.now() - start}, count: ${count.toLocaleString()}`); // test 1
*/

const result = soe_compressed_count(2_100_000_000);

console.log(`Duration: ${Date.now() - start}, count: ${result.toLocaleString()}`); // test 1

// const data = new Uint8Array([255, 255]);

// console.log(getBit(data, 1));
