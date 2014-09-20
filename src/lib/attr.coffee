module.exports = {

  reader: (object, options = {}) ->
    (properties) ->
      for name, getter of properties
        options.get = getter
        Object.defineProperty(object, name, options)
      undefined

  writer: (object, options = {}) ->
    (properties) ->
      for name, setter of properties
        options.set = setter
        Object.defineProperty(object, name, options)
      undefined

  readers: (objects...) ->
    @reader(object) for object in objects

  writers: (objects...) ->
    @writer(object) for object in objects

}
