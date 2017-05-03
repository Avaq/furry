'use strict';

const f = require('..');
const l = require('lodash');
const r = require('ramda');

const add = (a, b) => a + b;
const curried = a => b => add(a, b);
const unstaged = f.unstage(2, curried);

const furried = f.curry(add);
const lodashed = l.curry(add);
const ramdad = r.curry(add);

const curryPartial = curried(1);
const furryPartial = furried(1);
const unstagePartial = unstaged(1);
const lodashPartial = lodashed(1);
const ramdaPartial = ramdad(1);

const furryPlaceholded = furried(f._, 1);
const unstagePlaceholded = unstaged(f._, 1);
const lodashPlaceholded = lodashed(l, 1);
const ramdaPlaceholded = ramdad(r.__, 1);

module.exports = suite => {

  suite.add('baseline:add(1, 1)       ', () =>
    add(1, 1) === 2 || console.log('bad add(1, 1)'));

  suite.add('furried(1, 1)            ', () =>
    furried(1, 1) === 2 || console.log('bad furried(1, 1)'));
  suite.add('unstaged(1, 1)           ', () =>
    unstaged(1, 1) === 2 || console.log('bad unstaged(1, 1)'));
  suite.add('lodashed(1, 1)           ', () =>
    lodashed(1, 1) === 2 || console.log('bad lodashed(1, 1)'));
  suite.add('ramdad(1, 1)             ', () =>
    ramdad(1, 1) === 2 || console.log('bad ramdad(1, 1)'));

  suite.add('baseline:curried(1)(1)   ', () =>
    curried(1)(1) === 2 || console.log('bad curried(1, 1)'));
  suite.add('furried(1)(1)            ', () =>
    furried(1)(1) === 2 || console.log('bad furried(1)(1)'));
  suite.add('unstaged(1)(1)           ', () =>
    unstaged(1)(1) === 2 || console.log('bad unstaged(1)(1)'));
  suite.add('lodashed(1)(1)           ', () =>
    lodashed(1)(1) === 2 || console.log('bad lodashed(1)(1)'));
  suite.add('ramdad(1)(1)             ', () =>
    ramdad(1)(1) === 2 || console.log('bad ramdad(1)(1)'));

  suite.add('baseline:curryPartial(1) ', () =>
    curryPartial(1) === 2 || console.log('bad curryPartial(1)'));
  suite.add('furryPartial(1)          ', () =>
    furryPartial(1) === 2 || console.log('bad furryPartial(1)'));
  suite.add('unstagePartial(1)        ', () =>
    unstagePartial(1) === 2 || console.log('bad unstagePartial(1)'));
  suite.add('lodashPartial(1)         ', () =>
    lodashPartial(1) === 2 || console.log('bad lodashPartial(1)'));
  suite.add('ramdaPartial(1)          ', () =>
    ramdaPartial(1) === 2 || console.log('bad ramdaPartial(1)'));

  suite.add('furryPlaceholded(1)      ', () =>
    furryPlaceholded(1) === 2 || console.log('bad furryPlaceholded(1)'));
  suite.add('unstagePlaceholded(1)    ', () =>
    unstagePlaceholded(1) === 2 || console.log('bad unstagePlaceholded(1)'));
  suite.add('lodashPlaceholded(1)     ', () =>
    lodashPlaceholded(1) === 2 || console.log('bad lodashPlaceholded(1)'));
  suite.add('ramdaPlaceholded(1)      ', () =>
    ramdaPlaceholded(1) === 2 || console.log('bad ramdaPlaceholded(1)'));

  suite.add('furried(_, _, _)(1, 1)   ', () =>
    furried(f._, f._, f._)(1, 1) === 2 || console.log('bad furried(f._, f._, f._)(1, 1)'));
  suite.add('unstaged(_, _, _)(1, 1)  ', () =>
    unstaged(f._, f._, f._)(1, 1) === 2 || console.log('bad unstaged(f._, f._, f._)(1, 1)'));
  suite.add('lodashed(_, _, _)(1, 1)  ', () =>
    lodashed(l, l, l)(1, 1) === 2 || console.log('bad lodashed(l, l, l)(1, 1)'));
  suite.add('ramdad(_, _, _)(1, 1)    ', () =>
    ramdad(r.__, r.__, r.__)(1, 1) === 2 || console.log('bad ramdad(r.__, r.__, r.__)(1, 1)'));

}
