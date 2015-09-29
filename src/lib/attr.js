const clone = function(object) {
  return JSON.parse(JSON.stringify(object));
};

const factory = function(object, options, method) {
  options = clone(options);
  if (options.configurable === undefined) {
    options.configurable = true;
  }
  return function(properties) {
    for (const name in properties) {
      const accessor = properties[name];
      options[method] = accessor;
      Object.defineProperty(object, name, options);
    }
  };
};

export default {

  reader: function(object, options = {}) {
    return factory(object, options, 'get');
  },

  writer: function(object, options = {}) {
    return factory(object, options, 'set');
  },

  accessor: function(object, options = {}) {
    return [
      this.reader(object, options),
      this.writer(object, options)
    ];
  },

  accessors: function(object, options = {}) {
    const ioptions = clone(options);
    if (ioptions.enumerable === undefined) {
      ioptions.enumerable = true;
    }
    return this.accessor(object.prototype, ioptions).concat(
      this.accessor(object, options)
    );
  }

};
