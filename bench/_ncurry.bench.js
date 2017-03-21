const _ncurry = require('..')._internal._ncurry;
const _curryN = require('ramda/src/internal/_curryN');

const add = (a, b) => a + b;

const furried = _ncurry(2, add);
const ramdad = _curryN(2, [], add);

module.exports = suite => {

  suite.add('Furry', () => {
    if(furried(1, 1) !== 2) console.log('bad furried(1, 1)');
  });

  suite.add('Ramda', () => {
    if(ramdad(1, 1) !== 2) console.log('bad ramdad(1, 1)');
  });

}
