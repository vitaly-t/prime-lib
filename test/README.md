Tests
-----

To run all tests, with code coverage:

```shell
$ npm test
```

## Benchmarks

All benchmarks are inside [./benchmarks.ts](./benchmarks.ts) file.

* To run all available benchmarks (takes about 10 min to complete):

```shell
$ npm run bench
```

* To run individual benchmarks / per method:

```shell
$ npm run bench sieveInt
$ npm run bench sieveIntStart
$ npm run bench sieveBigInt
$ npm run bench sieveBigIntStart
$ npm run bench isPrime
```

* To run several specific benchmarks, list them via space:

```shell
$ npm run bench sieveInt sieveIntStart
```

**Most recent benchmark run:**

![image](https://user-images.githubusercontent.com/5108906/136043267-6edb8e9a-cc2c-4d6a-b776-7f339f5993fc.png)


