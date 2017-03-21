'use strict';

const benchmark = require('benchmark');

const setup = require('./curry.bench.js');

const suite = new benchmark.Suite
setup(suite);

suite.on('complete', function print(){
  this.forEach(x => console.log(x.toString()));
});

suite.run()
