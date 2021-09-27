export function* squareNumber(start: number) {
    let value = start > 1 ? findFirstPrime(start) - 2 : 1;
    do {
        if (value > 2) {
            let k, q;
            do {
                k = 3;
                value += 2;
                q = Math.floor(Math.sqrt(value));
                while (k <= q && value % k) {
                    k += 2;
                }
            } while (k <= q);
        } else {
            value = value === 2 ? 3 : 2;
        }
        yield value;
    } while (true);
}

function findFirstPrime(start: number): number {
    for (let i = start; true; i++) {
        let flag = 0;
        for (let j = 2; j < i; j++) {
            if (i % j == 0) {
                flag = 1;
                break;
            }
        }
        if (i > 1 && flag == 0) {
            return i;
        }
    }
}
