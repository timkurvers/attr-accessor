{attr, expect, sinon} = require('./spec-helper')

describe 'attr', ->

  describe '.reader', ->
    dummy = {}
    get = attr.reader(dummy, enumerable: true)

    it 'returns a getter factory', ->
      get name: -> 'Tim Kurvers'
      expect(dummy.name).to.equal 'Tim Kurvers'

    it 'passes through options', ->
      spy = @sandbox.spy(Object, 'defineProperty')
      get options: reader = ->
      expect(spy).to.have.been.calledWith(
        dummy, 'options', get: reader, configurable: true, enumerable: true
      )

  describe '.writer', ->
    dummy = {}
    set = attr.writer(dummy, enumerable: true)

    it 'returns a setter factory', ->
      set address: (address) ->
        [@host, @port] = address.split(':')
      dummy.address = 'localhost:1337'
      expect(dummy.host).to.equal 'localhost'
      expect(dummy.port).to.equal '1337'

    it 'passes through options', ->
      spy = @sandbox.spy(Object, 'defineProperty')
      set options: reader = ->
      expect(spy).to.have.been.calledWith(
        dummy, 'options', set: reader, configurable: true, enumerable: true
      )

  describe '.accessor', ->
    dummy = {}

    it 'returns getter and setter factories', ->
      @sandbox.stub(attr, 'reader').withArgs(dummy).returns 0
      @sandbox.stub(attr, 'writer').withArgs(dummy).returns 1
      [get, set] = attr.accessor(dummy)
      expect(get).to.equal 0
      expect(set).to.equal 1

  describe '.accessors', ->
    class Dummy

    before ->
      accessor = @sandbox.stub(attr, 'accessor')
      accessor.withArgs(Dummy::, enumerable: true).returns [0, 1]
      accessor.withArgs(Dummy).returns [2, 3]

    it 'returns enumerable prototype getter and setter factories', ->
      [get, set] = attr.accessors(Dummy)
      expect(get).to.equal 0
      expect(set).to.equal 1

    it 'returns static getter and setter factories', ->
      [_, _, get, set] = attr.accessors(Dummy)
      expect(get).to.equal 2
      expect(set).to.equal 3
