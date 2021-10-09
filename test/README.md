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
$ npm run bench sieveIntStart
$ npm run bench isPrime
```

* To run several specific benchmarks, list them via space:

```shell
$ npm run bench sieveInt sieveIntStart
```

**Most recent benchmark run:**

![image](https://user-images.githubusercontent.com/5108906/136663346-f070a46b-4a09-4d44-add7-869b394cbdd4.png)
