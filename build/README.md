primes-generator web build
--------------------------

Builds version of `primes-generator` for web distribution.

Before building web files, you need to build source JS files from the main project:

```
$ npm run build
```

## Steps

* Install local dependencies:

```sh
$ npm i
```

* Build web files:

```sh
$ npm run build
```

All files will be generated in folder `../dist/web`.

After including `primes-generator.min.js` into your web page, `primesGenerator` namespace will have all the functions:

```js
const iterator = primesGenerator.generatePrimes();
```
