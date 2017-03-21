'use strict';

var PH = '@@functional/placeholder';
var _ = {[PH]: true};

//////////////
// Internal //
//////////////

function _is_(x){
  return x && x[PH] === true;
}

function _arity(n, f){
  switch(n){
    case 0: return function(){ return apply(f, arguments) };
    case 1: return function(a){ return apply(f, arguments) };
    case 2: return function(a, b){ return apply(f, arguments) };
    case 3: return function(a, b, c){ return apply(f, arguments) };
    case 4: return function(a, b, c, d){ return apply(f, arguments) };
    case 5: return function(a, b, c, d, e){ return apply(f, arguments) };
    case 6: return function(a, b, c, d, e, f){ return apply(f, arguments) };
    case 7: return function(a, b, c, d, e, f, g){ return apply(f, arguments) };
    case 8: return function(a, b, c, d, e, f, g, h){ return apply(f, arguments) };
    case 9: return function(a, b, c, d, e, f, g, h, i){ return apply(f, arguments) };
    case 10: return function(a, b, c, d, e, f, g, h, i, j){ return apply(f, arguments) };
    default: throw new Error('First argument to _arity must be an integer between 0 and 10');
  }
};

function _1curry(f){
  return function curried(x){
    return arguments.length < 1 || _is_(x) ? curried : f(x);
  }
}

function _2curry(f){
  return function curried(x, y){
    switch(arguments.length){
      case 0: return curried;
      case 1: return _is_(x) ? _2curry(rotate(f)) : _1curry(y => f(x, y));
      case 2: if(!_is_(x) && !_is_(y)) return f(x, y); /*else fall through*/
      default: return apply(_ncurry(2, f), arguments);
    }
  }
}

function _ncurry(n, f){
  return function curried(){
    var i = arguments.length, p = false;
    if(i < 1) return curried;
    var xs = new Array(i);
    while(i--){
      if(_is_(arguments[i])) p = true;
      xs[i] = arguments[i];
    };
    return p ? _pcurried(n, f, xs) : _ncurried(n, f, xs);
  }
}

function _ncurried(n, f, xs){
  return xs.length >= n ? apply(f, xs) : ncurry(n - xs.length, partial(f, xs));
}

function _pcurried(n, f, xs){
  var l = xs.length;
  for(var i = 0, j = 0; i < l; i++){
    var k = i + 1;
    if(_is_(xs[i])){
      f = j === i ? rotate(f) : rotate(partial(f, xs.slice(j, i)));
      j = k; }
    else if(n === 1) return apply(f, xs.slice(j, k));
    else if(k === l) return ncurry(n - 1, partial(f, xs.slice(j, k)));
    else n--;
  }
  return ncurry(n, f);
}

////////////
// Public //
////////////

function isPlaceholder(x){
  return Boolean(_is_(x));
}

function apply(f, xs){
  var l = xs.length;
  switch (l){
    case 0: return f();
    case 1: return f(xs[0]);
    case 2: return f(xs[0], xs[1]);
    case 3: return f(xs[0], xs[1], xs[2]);
    default: return f.apply(undefined, xs);
  }
}

function rotate(f){
  return function rotated(){
    var l = arguments.length;
    var xs = new Array(l);
    xs[0] = arguments[l - 1];
    for(var i = 1; i < l; i++) xs[i] = arguments[i - 1];
    return apply(f, xs);
  }
}

function partial(f, xs){
  var lx = xs.length;
  return function partially(){
    var la = arguments.length;
    var ys = new Array(lx + la);
    for(var i = 0; i < lx; i++) ys[i] = xs[i];
    for(var i = 0; i < la; i++) ys[i + lx] = arguments[i];
    return apply(f, ys);
  }
}

function ncurry(n, f){
  return n === 1 ? _1curry(f) : n === 2 ? _2curry(f) : _arity(n, _ncurry(n, f));
}

function curry(f){
  return ncurry(f.length, f);
}

/////////////
// Exports //
/////////////

module.exports = {_, isPlaceholder, apply, rotate, partial, ncurry, curry, _internal: {
  _arity, _1curry, _2curry, _ncurry, _ncurried, _pcurried
}};
