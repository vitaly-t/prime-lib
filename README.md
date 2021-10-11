primes-generator
----------------

* [About](#about)
* [Installation](#installation)
* [Usage](#usage)
    * [JavaScript](#javascript)
    * [TypeScript](#typescript)
    * [RXJS](#rxjs)

## About

This [prime number] generator combines performance of [Sieve of Eratosthenes] algorithm with the maximum memory
efficiency. It is RXJS-friendly, and well suited for web app-s.

For tests and benchmarks, see [./test](./test) folder.

## Installation

```
$ npm i primes-generator
```

## Usage

Follow the usage examples below, based on your development environment.

### JavaScript

Generating an array with the first 10 primes:

```js
const {generatePrimes, stopOnCount} = require('primes-generator');

const i = generatePrimes(); // create infinite prime iterator 
const s = stopOnCount(i, 10); // stop-iterator after 10 values

const values = [...s]; // 2, 3, 5, 7, 11, 13, 17, 19, 23, 29
```

### TypeScript

Generating an array of all primes up to 17:

```js
import {generatePrimes, stopOnValue} from 'primes-generator';

const i = generatePrimes(); // create infinite prime iterator
const s = stopOnValue(i, 17); // stop-iterator when value reaches 17

const values = [...s]; // 2, 3, 5, 7, 11, 13, 17
```

### RXJS

Adding a reusable RXJS wrapper first:

```ts
import {Observable, from} from 'rxjs';
import {generatePrimes, IPrimeOptions} from 'primes-generator';

export function primes(options?: IPrimeOptions): Observable<number> {
    return from(generatePrimes(options));
}
```

* Generating the first 10 primes:

```ts
import {take} from 'rxjs';

primes().pipe(take(10))
    .subscribe(a => {
        // 2, 3, 5, 7, 11, 13, 17, 19, 23, 29
    });
```

* Generating 10 primes after 100:

```ts
import {take} from 'rxjs';

primes({start: 100}).pipe(take(10))
    .subscribe(a => {
        // 101, 103, 107, 109, 113, 127, 131, 137, 139, 149
    });
```

* Maximum-performance, buffered prime generation:

```ts
primes({boost: 10})
    .subscribe(a => {
        // 2, 3, 5, 7, 11, 13, 17, 19, 23, 29
    });
```

* Detecting primes in another sequence:

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
