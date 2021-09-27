# primes-generator

**UNDER DEVELOPMENT**

* [Usage](#usage)
    * [JavaScript](#javascript)
    * [TypeScript](#typescript)
    * [RXJS](#rxjs)

## Usage

To be documented...

### JavaScript

Example of generating an array with first 10 primes as `number`-s:

```js
const {generatePrimes, stopOnCount} = require('primes-generator');

const i = stopOnCount(generatePrimes(), 10);

const values = [...i]; // 2, 3, 5, 7, 11, 13, 17, 19, 23, 29
```

### TypeScript

Example of generating an array of all primes up to 17 as `bigint`-s:

```js
import {generateBigPrimes, stopOnValue} from 'primes-generator';

const i = stopOnValue(generateBigPrimes(), 17n);

const values = [...i]; // 2n, 3n, 5n, 7n, 11n, 13n, 17n
```

### RXJS

Example of generating 5 primes from 17 onwards:

```ts
import {from, take} from 'rxjs';
import {generatePrimes} from 'primes-generator';

from(generatePrimes(17))
    .pipe(take(5))
    .subscribe(a => {
        // will get here: 17, 19, 23, 29, 31
    });
```

Example of detecting primes in another sequence:

```ts
import {from} from 'rxjs';
import {isPrime} from 'primes-generator';

const sequence = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

from(sequence)
    .pipe(filter(a => isPrime(a)))
    .subscribe(a => {
        // will get here: 2, 3, 5, 7
    });
```
