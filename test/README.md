Tests
-----

To run all tests, with code coverage:

```shell
$ npm test
```

## Benchmarks

All benchmarks are inside [./benchmarks.ts](./benchmarks.ts) file.

* To run all available benchmarks (may take about 5 mins to complete):

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

**Most recent benchmark run:**

![image](https://user-images.githubusercontent.com/5108906/135862174-82b78ade-8cfc-496f-b3af-f6c7208be3aa.png)
