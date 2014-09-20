clone = (object) ->
  cloned = {}
  for own key, value of object
    cloned[key] = value
  cloned

module.exports = {

  reader: (object, options = {}) ->
    options = clone(options)
    options.configurable ?= true
    (properties) ->
      for name, getter of properties
        options.get = getter
        Object.defineProperty(object, name, options)
      undefined

  writer: (object, options = {}) ->
    options = clone(options)
    options.configurable ?= true
    (properties) ->
      for name, setter of properties
        options.set = setter
        Object.defineProperty(object, name, options)
      undefined

  accessor: (object, options = {}) ->
    ioptions = clone(options)
    ioptions.enumerable ?= true
    [
      @reader(object::, ioptions),
      @writer(object::, ioptions),
      @reader(object,   options),
      @writer(object,   options)
    ]

}
