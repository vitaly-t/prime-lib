Tests
-----

To run all tests, with code coverage:

```shell
$ npm test
```

## Benchmarks

All benchmarks are inside [./benchmarks.ts](./benchmarks.ts) file.

* To run all available benchmarks (takes about 5 min to complete):

```shell
$ npm run bench
```

* To run individual benchmarks / per method:

```shell
$ npm run bench sieveInt
$ npm run bench sieveIntBoost
$ npm run bench sieveIntStart
$ npm run bench isPrime
```

* To run several specific benchmarks, list them via space:

```shell
$ npm run bench sieveInt sieveIntStart
```

**Most recent benchmark run:**

![image](https://user-images.githubusercontent.com/5108906/136714126-b25b8d0f-a745-44d1-b5ad-196cadfeb5f7.png)

