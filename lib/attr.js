var __slice = [].slice;
var clone;

clone = require('clone');

module.exports = {
  reader: function(object, options) {
    if (options == null) {
      options = {};
    }
    options = clone(options);
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
