/*
   According to Pierre Dusart, once x > 598, the following becomes true:
   (x/ln x)(1 + 0.992/ln x) < π(x) <(x/ln x)(1 + 1.2762/ln x).
   It means we need pre-calculated primes up to 593.
   See: https://primes.utm.edu/howmany.html
*/
export const primes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37,
    41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89,
    97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
    157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223,
    227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281,
    283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359,
    367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433,
    439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503,
    509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593
];

function countPrimesApprox(x) {
    if (x <= 598) {
        let count = 0, i = 0;
        while (primes[i++] <= x) {
            count++;
        }
        return count;
    }
    const a = x / Math.log(x) * (1 + 0.992 / Math.log(x));
    const b = x / Math.log(x) * (1 + 1.2762 / Math.log(x));
    return Math.round((a + b) / 2); // take the value in the middle
}

console.log(countPrimesApprox(1000).toLocaleString());

// https://gist.github.com/vitaly-t/85bc103756139c3e68d9c79b0ad15d99
