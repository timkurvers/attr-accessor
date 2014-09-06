!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.attr=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var __slice = [].slice;

module.exports = {
  reader: function(object) {
    return function(properties) {
      var getter, name;
      for (name in properties) {
        getter = properties[name];
        Object.defineProperty(object, name, {
          get: getter,
          enumerable: false
        });
      }
      return void 0;
    };
  },
  writer: function(object) {
    return function(properties) {
      var name, setter;
      for (name in properties) {
        setter = properties[name];
        Object.defineProperty(object, name, {
          set: setter,
          enumerable: true
        });
      }
      return void 0;
    };
  },
  readers: function() {
    var object, objects, _i, _len, _results;
    objects = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    _results = [];
    for (_i = 0, _len = objects.length; _i < _len; _i++) {
      object = objects[_i];
      _results.push(this.reader(object));
    }
    return _results;
  },
  writers: function() {
    var object, objects, _i, _len, _results;
    objects = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    _results = [];
    for (_i = 0, _len = objects.length; _i < _len; _i++) {
      object = objects[_i];
      _results.push(this.writer(object));
    }
    return _results;
  }
};

},{}]},{},[1])
(1)
});