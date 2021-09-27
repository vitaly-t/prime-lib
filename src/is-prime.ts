export function isPrime(value: number | bigint): boolean {
    switch (typeof value) {
        case 'number':
            return isPrimeNumber(value);
        case 'bigint':
            return isPrimeBigNumber(value);
        default:
            break;
    }
    return false;
}

function isPrimeNumber(value: number): boolean {
    return false;
}

function isPrimeBigNumber(value: bigint): boolean {
    return false;
}
