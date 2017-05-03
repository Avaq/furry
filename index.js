'use strict';

var PH = '@@functional/placeholder';
var _ = {};
_[PH] = true;

//////////////
// Internal //
//////////////

//Determine whether x is a placeholder
function _is_(x){
  return x === _ || x && x[PH] === true;
}

//Coerce f to report an arity of n
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
    default: throw new RangeError('Arity too large');
  }
};

//Add placeholder support to unary function f
function _punary(f){
  return function unary(x){
    return arguments.length < 1 || _is_(x) ? curried : f(x);
  }
}

//Curry uncurried binary function f
function _2curry(f){
  return function _2curried(x, y){
    switch(arguments.length){
      case 0: return _2curried;
      case 1: return _is_(x) ? _2curry(rotate(f)) : _punary(function second(y){return f(x, y)});
      case 2: if(!_is_(x) && !_is_(y)) return f(x, y); /*else fall through*/
      default: return apply(_ncurry(2, f), arguments);
    }
  }
}

//Curry uncurried n-ary function f
function _ncurry(n, f){
  return function _ncurried(){
    var i = arguments.length, p = false;
    if(i < 1) return _ncurried;
    var xs = new Array(i);
    while(i--){
      if(_is_(arguments[i])) p = true;
      xs[i] = arguments[i];
    };
    return p ? _pnapply(n, f, xs) : _napply(n, f, xs);
  }
}

//Fully or partially apply arguments without placeholders xs to n-ary function f
function _napply(n, f, xs){
  return xs.length >= n ? apply(f, xs) : ncurry(n - xs.length, partial(f, xs));
}

//Fully or partially apply arguments with placeholders xs to n-ary function f
function _pnapply(n, f, xs){
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

//Unstage n-ary staged function f
function _nunstage(n, f){
  return function unstaged(){
    var l = arguments.length, m = n, g = f, x;
    if(l < 1) return unstaged;
    for(var i = 0; i < l; i++){
      x = arguments[i];
      if(_is_(x)){
        g = crotate(m, g);
      }else{
        g = g(x);
        m = m - 1;
      }
    }
    return m < 1 ? g : unstage(m, g);
  }
}

//Rotates an array such that its last element becomes its first
function _rotate(xs){
  var l = xs.length;
  var ys = new Array(l);
  ys[0] = xs[l - 1];
  for(var i = 1; i < l; i++) ys[i] = xs[i - 1];
  return ys;
}

////////////
// Public //
////////////

//Determine if x is a placeholder, ensures a Boolean is always returned
function isPlaceholder(x){
  return Boolean(_is_(x));
}

//Apply arguments xs to uncurried function f
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

//Apply arguments xs to curried function f
function capply(f, xs){
  var l = xs.length;
  switch (l){
    case 0: return f();
    case 1: return f(xs[0]);
    case 2: return f(xs[0])(xs[1]);
    case 3: return f(xs[0])(xs[1])(xs[2]);
    default:
      for(var i = 0; i < l; i++){ f = f(xs[i]); }
      return f;
  }
}

//Rotate argument order of uncurried function f
function rotate(f){
  return function rotated(){
    return apply(f, _rotate(arguments));
  }
}

//Rotate argument order of n-ary curried function f
function crotate(n, f){
  if(n < 2) return f;
  return _ncurry(n, function rotated(){
    return capply(f, _rotate(arguments));
  });
}

//Partially apply uncurried function f with arguments xs
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

//Curry n-ary uncurried function f
function ncurry(n, f){
  return n === 1 ? _punary(f) : n === 2 ? _2curry(f) : _arity(n, _ncurry(n, f));
}

//Curry variadic uncurried function f
function curry(f){
  return ncurry(f.length, f);
}

//Unstage n-ary staged function f
function unstage(n, f){
  return n === 1 ? _punary(f) : _arity(n, _nunstage(n, f));
}

/////////////
// Exports //
/////////////

module.exports = {
  _: _,
  isPlaceholder: isPlaceholder,
  apply: apply,
  capply: capply,
  rotate: rotate,
  crotate: crotate,
  partial: partial,
  ncurry: ncurry,
  curry: curry,
  unstage: unstage
};
