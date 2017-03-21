# furry

Fast¹ curry with cyclical² placeholder semantics

```js
const {_, curry} = require('furry');

const a = 1, b = 2, c = 3;

const f = curry((a, b, c) => a - b * c);

[
  f(a, b, c),
  f(_, _, c, _)(b, a),
  f(_)(_)(c)(_)(b)(a),
  f(_, _, c, _, b, a)
]
.every(x => x === -5)
```

## `1` Fast

```text
$ node bench
uncurried baseline       x 74,683,534 ops/sec ±0.84% (89 runs sampled)
furried(1, 1)            x 4,409,283 ops/sec ±1.23% (93 runs sampled)
lodashed(1, 1)           x 6,697,690 ops/sec ±2.96% (84 runs sampled)
ramdad(1, 1)             x 9,911,618 ops/sec ±0.70% (89 runs sampled)
furried(1)(1)            x 3,116,517 ops/sec ±0.60% (94 runs sampled)
lodashed(1)(1)           x 278,068 ops/sec ±0.81% (93 runs sampled)
ramdad(1)(1)             x 1,360,526 ops/sec ±2.02% (85 runs sampled)
furryPartial(1)          x 11,299,266 ops/sec ±0.62% (88 runs sampled)
lodashPartial(1)         x 2,019,156 ops/sec ±0.85% (89 runs sampled)
ramdaPartial(1)          x 9,052,875 ops/sec ±0.95% (83 runs sampled)
furryPlaceholded(1)      x 5,791,657 ops/sec ±0.85% (91 runs sampled)
lodashPlaceholded(1)     x 1,958,966 ops/sec ±0.90% (84 runs sampled)
ramdaPlaceholded(1)      x 8,763,719 ops/sec ±1.02% (84 runs sampled)
furried(_, _, _)(1, 1)   x 855,267 ops/sec ±1.76% (85 runs sampled)
lodashed(_, _, _)(1, 1)  x 239,436 ops/sec ±1.44% (90 runs sampled)
ramdad(_, _, _)(1, 1)    x 1,857,744 ops/sec ±1.21% (80 runs sampled)
```

## `2` Cyclical placeholder semantics

Rather than the placeholder flipping the argument with the next, the argument
is flipped with the last. To learn more, check out [my Gist explaining the idea][1].

[1]: https://gist.github.com/Avaq/fcc2bdc99a2a8bc083f7
