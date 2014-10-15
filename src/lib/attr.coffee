clone = (object) ->
  cloned = {}
  for own key, value of object
    cloned[key] = value
  cloned

module.exports =

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
    [
      @reader(object, options),
      @writer(object, options)
    ]

  accessors: (object, options = {}) ->
    ioptions = clone(options)
    ioptions.enumerable ?= true
    @accessor(object::, ioptions).concat @accessor(object, options)
