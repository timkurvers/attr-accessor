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
