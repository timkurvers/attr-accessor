/**
 * attr-accessor v0.2.2
 * Copyright (c) 2014-2015 Tim Kurvers <tim@moonsphere.net>
 *
 * Convenience factories for creating getter/setters.
 *
 * Licensed under the MIT license.
 */

!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.attr=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var clone = function clone(object) {
  return JSON.parse(JSON.stringify(object));
};

var factory = function factory(object, options, method) {
  options = clone(options);
  if (options.configurable === undefined) {
    options.configurable = true;
  }
  return function (properties) {
    for (var _name in properties) {
      var accessor = properties[_name];
      options[method] = accessor;
      Object.defineProperty(object, _name, options);
    }
  };
};

module.exports = {

  reader: function reader(object) {
    var options = arguments[1] === undefined ? {} : arguments[1];

    return factory(object, options, 'get');
  },

  writer: function writer(object) {
    var options = arguments[1] === undefined ? {} : arguments[1];

    return factory(object, options, 'set');
  },

  accessor: function accessor(object) {
    var options = arguments[1] === undefined ? {} : arguments[1];

    return [this.reader(object, options), this.writer(object, options)];
  },

  accessors: function accessors(object) {
    var options = arguments[1] === undefined ? {} : arguments[1];

    var ioptions = clone(options);
    if (ioptions.enumerable === undefined) {
      ioptions.enumerable = true;
    }
    return this.accessor(object.prototype, ioptions).concat(this.accessor(object, options));
  }

};
},{}]},{},[1])
(1)
});