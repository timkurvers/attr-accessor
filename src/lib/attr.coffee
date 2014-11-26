clone = (object) ->
  cloned = {}
  for own key, value of object
    cloned[key] = value
  cloned

factory = (object, options, method) ->
  options = clone(options)
  options.configurable ?= true
  (properties) ->
    for name, accessor of properties
      options[method] = accessor
      Object.defineProperty(object, name, options)
    undefined

module.exports =

  reader: (object, options = {}) ->
    factory object, options, 'get'

  writer: (object, options = {}) ->
    factory object, options, 'set'

  accessor: (object, options = {}) ->
    [
      @reader(object, options),
      @writer(object, options)
    ]

  accessors: (object, options = {}) ->
    ioptions = clone(options)
    ioptions.enumerable ?= true
    @accessor(object::, ioptions).concat @accessor(object, options)
