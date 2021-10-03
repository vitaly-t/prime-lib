Tests
-----

To run all tests, with code coverage:

```shell
$ npm test
```

## Benchmarks

All benchmarks are inside [./benchmarks.ts](./benchmarks.ts) file.

* To run all available benchmarks:

```shell
$npm run bench
```

* To run individual benchmarks / per method:

```shell
$npm run bench sieveInt
$npm run bench sieveIntStart
$npm run bench sieveBigInt
$npm run bench sieveBigIntStart
```

* To run several specific benchmarks, list them via space:

```shell
$npm run bench sieveInt sieveIntStart
```
