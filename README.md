# furry

[![Greenkeeper badge](https://badges.greenkeeper.io/Avaq/furry.svg)](https://greenkeeper.io/)

Fast¹ `curry` and `unstage` with *cyclical placeholder semantics*²

```js
const {_, curry, unstage} = require('furry');

const a = 1, b = 2, c = 3;

const f = curry((a, b, c) => a - b * c);
const g = unstage(3, a => b => c => a - b * c);

[
  f(a, b, c),
  g(a, b, c),
  f(_, _, c, _)(b, a),
  g(_, _, c, _)(b, a),
  f(_)(_)(c)(_)(b)(a),
  g(_)(_)(c)(_)(b)(a),
  f(_, _, c, _, b, a),
  g(_, _, c, _, b, a)
]
.every(x => x === -5)
```

## `1` Fast

```text
$ node bench
baseline:add(1, 1)        x 72,850,400 ops/sec ±1.50% (86 runs sampled)
furried(1, 1)             x 4,445,663 ops/sec ±0.64% (89 runs sampled)
unstaged(1, 1)            x 3,450,117 ops/sec ±1.88% (84 runs sampled)
lodashed(1, 1)            x 7,568,708 ops/sec ±0.71% (91 runs sampled)
ramdad(1, 1)              x 10,308,174 ops/sec ±0.77% (90 runs sampled)
baseline:curried(1)(1)    x 18,450,633 ops/sec ±0.68% (93 runs sampled)
furried(1)(1)             x 3,121,704 ops/sec ±0.51% (91 runs sampled)
unstaged(1)(1)            x 3,140,134 ops/sec ±0.54% (91 runs sampled)
lodashed(1)(1)            x 243,145 ops/sec ±0.69% (91 runs sampled)
ramdad(1)(1)              x 1,543,558 ops/sec ±0.80% (90 runs sampled)
baseline:curryPartial(1)  x 63,945,780 ops/sec ±0.41% (88 runs sampled)
furryPartial(1)           x 12,362,120 ops/sec ±0.88% (94 runs sampled)
unstagePartial(1)         x 11,079,596 ops/sec ±2.81% (87 runs sampled)
lodashPartial(1)          x 2,263,313 ops/sec ±0.50% (94 runs sampled)
ramdaPartial(1)           x 10,573,827 ops/sec ±0.76% (90 runs sampled)
furryPlaceholded(1)       x 5,265,711 ops/sec ±0.50% (90 runs sampled)
unstagePlaceholded(1)     x 2,834,040 ops/sec ±0.91% (89 runs sampled)
lodashPlaceholded(1)      x 2,228,914 ops/sec ±0.75% (90 runs sampled)
ramdaPlaceholded(1)       x 10,835,524 ops/sec ±0.67% (92 runs sampled)
furried(_, _, _)(1, 1)    x 1,089,515 ops/sec ±0.70% (93 runs sampled)
unstaged(_, _, _)(1, 1)   x 409,976 ops/sec ±1.19% (90 runs sampled)
lodashed(_, _, _)(1, 1)   x 244,057 ops/sec ±1.00% (92 runs sampled)
ramdad(_, _, _)(1, 1)     x 2,239,597 ops/sec ±1.14% (80 runs sampled)
```

## `2` Cyclical placeholder semantics

Rather than the placeholder flipping the argument with the next, the argument
is flipped with the last. To learn more, check out [my Gist explaining the idea][1].

[1]: https://gist.github.com/Avaq/fcc2bdc99a2a8bc083f7
