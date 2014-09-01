module.exports = {

  reader: (object) ->
    (properties) ->
      for name, getter of properties
        Object.defineProperty(object, name, get: getter, enumerable: false)
      undefined

  writer: (object) ->
    (properties) ->
      for name, setter of properties
        Object.defineProperty(object, name, set: setter, enumerable: true)
      undefined

  readers: (objects...) ->
    @reader(object) for object in objects

  writers: (objects...) ->
    @writer(object) for object in objects

}
