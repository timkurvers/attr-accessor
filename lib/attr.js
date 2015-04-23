var clone, factory,
  hasProp = {}.hasOwnProperty;

clone = function(object) {
  var cloned, key, value;
  cloned = {};
  for (key in object) {
    if (!hasProp.call(object, key)) continue;
    value = object[key];
    cloned[key] = value;
  }
  return cloned;
};

factory = function(object, options, method) {
  options = clone(options);
  if (options.configurable == null) {
    options.configurable = true;
  }
  return function(properties) {
    var accessor, name;
    for (name in properties) {
      accessor = properties[name];
      options[method] = accessor;
      Object.defineProperty(object, name, options);
    }
    return void 0;
  };
};

module.exports = {
  reader: function(object, options) {
    if (options == null) {
      options = {};
    }
    return factory(object, options, 'get');
  },
  writer: function(object, options) {
    if (options == null) {
      options = {};
    }
    return factory(object, options, 'set');
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
