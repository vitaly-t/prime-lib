primes-generator
----------------

* [About](#about)
* [Installation](#installation)
* [Usage](#usage)
    * [JavaScript](#javascript)
    * [TypeScript](#typescript)
    * [RXJS](#rxjs)

## About

This set of [prime number] generators combines performance of [Sieve of Eratosthenes] algorithm
with the maximum memory efficiency. It is best suited for infinite generators offered here,
to run in lite clients, like web apps, and to be stream-compatible and RXJS-friendly.

Further performance optimizations require use of pre-allocated buffers, which compromises
on the memory consumption, and thus out of scope here.

For tests and benchmarks, see [./test](./test) folder.

## Installation

```
$ npm i primes-generator
```

## Usage

Follow the simple usage examples below, based on your development environment.

### JavaScript

Example of generating an array with the first 10 primes:

```js
const {generatePrimes, stopOnCount} = require('primes-generator');

const i = generatePrimes(); // create infinite prime iterator 
const s = stopOnCount(i, 10); // stop-iterator after 10 values

const values = [...s]; // 2, 3, 5, 7, 11, 13, 17, 19, 23, 29
```

### TypeScript

Example of generating an array of all primes up to 17:

```js
import {generatePrimes, stopOnValue} from 'primes-generator';

const i = generatePrimes(); // create infinite prime iterator
const s = stopOnValue(i, 17); // stop-iterator when value reaches 17

const values = [...s]; // 2, 3, 5, 7, 11, 13, 17
```

### RXJS

Adding a reusable RXJS wrapper from start is a good practice:

```ts
import {Observable, from} from 'rxjs';
import {generatePrimes} from 'primes-generator';

export function primes(start?: number): Observable<number> {
    return from(generatePrimes(start));
}
```

Example of generating 5 primes from 7 and upward:

```ts
import {take} from 'rxjs';

primes(7).pipe(take(5))
    .subscribe(a => {
        // 7, 11, 13, 17, 19
    });
```

Example of detecting primes in another sequence:

```ts
import {from, filter} from 'rxjs';
import {isPrime} from 'primes-generator';

const sequence = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

from(sequence).pipe(filter(isPrime))
    .subscribe(a => {
        // 2, 3, 5, 7
    });
```

[prime number]:https://en.wikipedia.org/wiki/Prime_number
[Sieve of Eratosthenes]:https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
