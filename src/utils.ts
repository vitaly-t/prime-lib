/**
 * Maximum prime number that can be generated in JavaScript,
 * using the standard 'number' type (53-bit of integer range).
 */
export const maxPrime = 9_007_199_254_740_881;

/**
 * Stops an iterator when a callback condition is met.
 */
export function* stopWhen<T>(iterator: IterableIterator<T>, cb: (value: T, index: number) => boolean): IterableIterator<T> {
    let i, index = 0;
    for (; ;) {
        i = iterator.next();
        if (i.done || cb(i.value, index++)) {
            break;
        }
        yield i.value;
    }
    return i.value;
}
