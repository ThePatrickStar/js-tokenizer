function f0() { }

function f1() {
  f2.prototype = arguments;
  new f2();
}

function f2() {
  Array.prototype.sort.call(this, f0);
}

f1(1, 2, 3);
