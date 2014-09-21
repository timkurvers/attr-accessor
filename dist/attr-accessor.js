!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.attr=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var clone,
  __hasProp = {}.hasOwnProperty;

clone = function(object) {
  var cloned, key, value;
  cloned = {};
  for (key in object) {
    if (!__hasProp.call(object, key)) continue;
    value = object[key];
    cloned[key] = value;
  }
  return cloned;
};

module.exports = {
  reader: function(object, options) {
    if (options == null) {
      options = {};
    }
    options = clone(options);
    if (options.configurable == null) {
      options.configurable = true;
    }
    return function(properties) {
      var getter, name;
      for (name in properties) {
        getter = properties[name];
        options.get = getter;
        Object.defineProperty(object, name, options);
      }
      return void 0;
    };
  },
  writer: function(object, options) {
    if (options == null) {
      options = {};
    }
    options = clone(options);
    if (options.configurable == null) {
      options.configurable = true;
    }
    return function(properties) {
      var name, setter;
      for (name in properties) {
        setter = properties[name];
        options.set = setter;
        Object.defineProperty(object, name, options);
      }
      return void 0;
    };
  },
  accessor: function(object, options) {
    if (options == null) {
      options = {};
    }
    return [this.reader(object, options), this.writer(object, options)];
  },
  accessors: function(object, options) {
    var ioptions;
    if (options == null) {
      options = {};
    }
    ioptions = clone(options);
    if (ioptions.enumerable == null) {
      ioptions.enumerable = true;
    }
    return this.accessor(object.prototype, ioptions).concat(this.accessor(object, options));
  }
};

},{}]},{},[1])
(1)
});