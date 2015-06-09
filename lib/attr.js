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
    undefined;
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