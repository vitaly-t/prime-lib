primes-generator
----------------

* [About](#about)
* [Installation](#installation)
* [Usage](#usage)
    * [JavaScript](#javascript)
    * [TypeScript](#typescript)
    * [RXJS](#rxjs)
* [API](#api)

## About

This [prime number] generator combines performance of [Sieve of Eratosthenes] algorithm with the maximum memory
efficiency. It was designed to be [RXJS]-friendly, and well suited for web app-s.

* See [WiKi] to help decide which generator to use.
* Other resources: [tests](./test) and [benchmarks](./benchmarks).

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

const i = generatePrimes(); // create infinite primes iterator 
const s = stopOnCount(i, 10); // stop-iterator after 10 values

const values = [...s]; // 2, 3, 5, 7, 11, 13, 17, 19, 23, 29
```

### TypeScript

* Generating an array of all primes up to 17:

```js
import {generatePrimes, stopOnValue} from 'primes-generator';

const i = generatePrimes(); // create infinite primes iterator
const s = stopOnValue(i, 17); // stop-iterator when value reaches 17

const values = [...s]; // 2, 3, 5, 7, 11, 13, 17
```

* Approximate primes count up to 1 million:

```ts
import {countPrimesApprox} from 'primes-generator';

const r = countPrimesApprox(1_000_000);
//=> { avg: 78324, min: 77580, max: 79068 }
//=> Actual count is 78498 => 0.2% margin
```

Calculation above is instant, and `avg` is always within 1% margin.

### RXJS

Adding a reusable [RXJS] wrapper first:

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
    .subscribe(prime => {
        // 2, 3, 5, 7, 11, 13, 17, 19, 23, 29
    });
```

* Generating 10 primes after 100:

```ts
import {take} from 'rxjs';

primes({start: 100}).pipe(take(10))
    .subscribe(prime => {
        // 101, 103, 107, 109, 113, 127, 131, 137, 139, 149
    });
```

* Maximum-performance, buffered primes generation:

```ts
primes({boost: 10})
    .subscribe(prime => {
        // 2, 3, 5, 7, 11, 13, 17, 19, 23, 29
    });
```

* Detecting primes in another sequence:

```ts
import {range, filter} from 'rxjs';
import {isPrime} from 'primes-generator';

range(0, 20).pipe(filter(a => isPrime(a)))
    .subscribe(prime => {
        // 2, 3, 5, 7, 11, 13, 17, 19
    });
```

## API

#### <i>Prime generators:</i>

* `generatePrimes()` - efficiency-focused, infinite prime generator
* `generatePrimes({start: x})` - efficiency-focused, infinite prime generator, starting from `x`
* `generatePrimes({boost: n})` - performance-focused prime generator, for up to `n` primes

#### <i>Popular prime functions:</i>

* `isPrime(x)` - verifies if `x` is a prime number
* `countPrimesApprox(x)` - instant primes counter, up to `x`, with error margin < 1%
* `countPrimes(x)` - precise primes counter, up to `x`

#### <i>Helpers for iterators:</i>

* `stopOnCount(iterator, count)` - stops the iterator, once `count` has been reached
* `stopOnValue(iterator, maxValue)` - stops the iterator when `maxValue` is exceeded
* `stopWhen(iterator, cb)` - stops the iterator when the callback returns a truthy value

[prime number]:https://en.wikipedia.org/wiki/Prime_number

[Sieve of Eratosthenes]:https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes

[WiKi]:https://github.com/vitaly-t/primes-generator/wiki

[RXJS]:https://github.com/ReactiveX/rxjs
