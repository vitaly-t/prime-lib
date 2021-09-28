/**
 * Terminates a number/bigint iterator upon reaching a maximum value.
 * Handles both finite and infinite sequences.
 */
export function* stopOnValue<T>(iterator: IterableIterator<T>, maxValue: T): IterableIterator<T> {
    let a;
    for (; ;) {
        a = iterator.next();
        if (a.value > maxValue || a.done) {
            break;
        }
        yield a.value;
    }
    return a.value;
}

/**
 * Terminates a number/bigint iterator after producing 'total' number of elements.
 * Handles both finite and infinite sequences.
 */
export function* stopOnCount<T>(iterator: IterableIterator<T>, total: number): IterableIterator<T> {
    let a, count = 0;
    while (count++ < total) {
        a = iterator.next();
        if (a.done) {
            break;
        }
        yield a.value;
    }
    return a?.value;
}
