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
  accessor: function(object, options) {
    var ioptions;
    if (options == null) {
      options = {};
    }
    ioptions = clone(options);
    ioptions.enumerable || (ioptions.enumerable = true);
    return [this.reader(object.prototype, ioptions), this.writer(object.prototype, ioptions), this.reader(object, options), this.writer(object, options)];
  }
};
