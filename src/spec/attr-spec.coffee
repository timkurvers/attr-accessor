{attr, expect, sinon} = require('./spec-helper')

describe 'attr', ->

  describe '.reader', ->
    dummy = {}
    get = attr.reader(dummy)

    it 'returns a reader factory for given object', ->
      expect(get).to.be.callable

    it 'creates a getter through factory', ->
      get name: -> 'Tim Kurvers'
      expect(dummy.name).to.equal 'Tim Kurvers'

  describe '.writer', ->
    dummy = {}
    set = attr.writer(dummy)

    it 'returns a writer factory for given object', ->
      expect(set).to.be.callable

    it 'creates a setter through factory', ->
      set address: (address) ->
        [@host, @port] = address.split(':')
      dummy.address = 'localhost:1337'
      expect(dummy.host).to.equal 'localhost'
      expect(dummy.port).to.equal '1337'

  describe '.readers', ->
    it 'returns reader factories for given objects', ->
      sinon.stub(attr, 'reader').returnsArg(0)
      expect(attr.readers(1, 2)).to.eql [1, 2]

  describe '.writers', ->
    it 'returns write factories for given objects', ->
      sinon.stub(attr, 'writer').returnsArg(0)
      expect(attr.writers(1, 2)).to.eql [1, 2]
