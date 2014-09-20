{attr, expect, sinon} = require('./spec-helper')

describe 'attr', ->

  describe '.reader', ->
    dummy = {}
    get = attr.reader(dummy, enumerable: true)

    it 'creates a getter through factory', ->
      get name: -> 'Tim Kurvers'
      expect(dummy.name).to.equal 'Tim Kurvers'

    it 'passes through options', ->
      spy = @sandbox.spy(Object, 'defineProperty')
      get options: reader = ->
      expect(spy).to.have.been.calledWith(
        dummy, 'options', get: reader, enumerable: true
      )

  describe '.writer', ->
    dummy = {}
    set = attr.writer(dummy, enumerable: true)

    it 'creates a setter through factory', ->
      set address: (address) ->
        [@host, @port] = address.split(':')
      dummy.address = 'localhost:1337'
      expect(dummy.host).to.equal 'localhost'
      expect(dummy.port).to.equal '1337'

    it 'passes through options', ->
      spy = @sandbox.spy(Object, 'defineProperty')
      set options: reader = ->
      expect(spy).to.have.been.calledWith(
        dummy, 'options', set: reader, enumerable: true
      )

  describe '.readers', ->
    it 'returns reader factories for given objects', ->
      sinon.stub(attr, 'reader').returnsArg(0)
      expect(attr.readers(1, 2)).to.eql [1, 2]

  describe '.writers', ->
    it 'returns write factories for given objects', ->
      sinon.stub(attr, 'writer').returnsArg(0)
      expect(attr.writers(1, 2)).to.eql [1, 2]
