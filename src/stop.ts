/**
 * Terminates a number/bigint iterator upon reaching a maximum value.
 * Handles both finite and infinite sequences.
 */
export function* stopOnValue<T = number>(iterator: IterableIterator<T>, maxValue: T): IterableIterator<T> {
    let a, n;
    do {
        n = iterator.next();
        if (n.value > maxValue) {
            break;
        }
        a = n.value;
        yield a;
    } while (!n.done);
    return a;
}

/**
 * Terminates a number/bigint iterator after producing 'total' number of elements.
 * Handles both finite and infinite sequences.
 */
export function* stopOnCount<T = number>(iterator: IterableIterator<T>, total: number): IterableIterator<T> {
    let a, count = 0;
    do {
        a = iterator.next();
        if (!a.done) {
            yield a.value;
        }
        count++;
    } while (count < total && !a.done);
    return a;
}
