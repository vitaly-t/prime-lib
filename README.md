prime-lib
---------

* [About](#about)
* [Installation](#installation)
* [Usage](#usage)
    * [JavaScript](#javascript)
    * [TypeScript](#typescript)
    * [RXJS](#rxjs)
* [API](#api)

## About

Popular [prime number] functions, implemented in TypeScript, with focus on memory efficiency and performance,
to be friendly for Web apps, and [RXJS] in particular. 

It features many well-known optimization methods, such as [Sieve of Eratosthenes], [Meissel Lehmer], etc.

See the following resources:

* [API](#api) - all available functions
* [WiKi] - to help choose a prime generator
* [Benchmarks](./benchmarks) - to see the performance

## Installation

```
$ npm i prime-lib
```

## Usage

Follow the usage examples below, based on your development environment.

### JavaScript

Generating an array with the first 10 primes:

```js
const {generatePrimes, stopOnCount} = require('prime-lib');

const i = generatePrimes(); // create infinite primes iterator 
const s = stopOnCount(i, 10); // stop-iterator after 10 values

const values = [...s]; // 2, 3, 5, 7, 11, 13, 17, 19, 23, 29
```

### TypeScript

Generating an array of all primes up to 17:

```js
import {generatePrimes, stopOnValue} from 'prime-lib';

const i = generatePrimes(); // create infinite primes iterator
const s = stopOnValue(i, 17); // stop-iterator when value reaches 17

const values = [...s]; // 2, 3, 5, 7, 11, 13, 17
```

### RXJS

Adding a reusable [RXJS] wrapper first:

```ts
import {Observable, from} from 'rxjs';
import {generatePrimes, IPrimeOptions} from 'prime-lib';

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
import {isPrime} from 'prime-lib';

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
* `countPrimes(x)` - precise primes counter, up to `x`, using [Meissel Lehmer algorithm]
* `countPrimesApprox(x)` - instant primes counter, up to `x`, with error margin < 1%
* `primeFactors(x)` - calculates prime factorization

Work-in-progress:

* `nthPrime(n)` - returns prime from index (_**not implemented yet**_)
* `nthPrimeApprox(n)` - returns approximate prime from index (_**not implemented yet**_)

#### <i>Extra helpers:</i>

* `cachePrimes(n)` - creates a gap-compressed cache of `n` primes (see [WiKi]) 
* `stopOnCount(iterator, count)` - stops the iterator, once `count` has been reached
* `stopOnValue(iterator, maxValue)` - stops the iterator when `maxValue` is exceeded
* `stopWhen(iterator, cb)` - stops the iterator when the callback returns a truthy value

[prime number]:https://en.wikipedia.org/wiki/Prime_number

[Sieve of Eratosthenes]:https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes

[WiKi]:https://github.com/vitaly-t/prime-lib/wiki

[RXJS]:https://github.com/ReactiveX/rxjs

[Meissel Lehmer]:https://en.wikipedia.org/wiki/Meissel%E2%80%93Lehmer_algorithm
[Meissel Lehmer algorithm]:https://en.wikipedia.org/wiki/Meissel%E2%80%93Lehmer_algorithm
