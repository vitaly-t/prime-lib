/**
 * Calculates prime factorization of a number.
 *
 * TODO: This is the most basic implementation,
 *   which may struggle with large numbers,
 *   and needs some good optimization.
 */
export function primeFactors(x: number): number[] {
    const factors = [];
    let divisor = 2;
    while (x >= 2) {
        if (x % divisor === 0) {
            factors.push(divisor);
            x = x / divisor;
        } else {
            divisor++;
        }
    }
    return factors;
}
