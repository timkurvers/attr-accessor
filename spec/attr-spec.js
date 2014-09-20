var attr, expect, sinon, _ref;

_ref = require('./spec-helper'), attr = _ref.attr, expect = _ref.expect, sinon = _ref.sinon;

describe('attr', function() {
  describe('.reader', function() {
    var dummy, get;
    dummy = {};
    get = attr.reader(dummy, {
      enumerable: true
    });
    it('creates a getter through factory', function() {
      get({
        name: function() {
          return 'Tim Kurvers';
        }
      });
      return expect(dummy.name).to.equal('Tim Kurvers');
    });
    return it('passes through options', function() {
      var reader, spy;
      spy = this.sandbox.spy(Object, 'defineProperty');
      get({
        options: reader = function() {}
      });
      return expect(spy).to.have.been.calledWith(dummy, 'options', {
        get: reader,
        enumerable: true
      });
    });
  });
  describe('.writer', function() {
    var dummy, set;
    dummy = {};
    set = attr.writer(dummy, {
      enumerable: true
    });
    it('creates a setter through factory', function() {
      set({
        address: function(address) {
          var _ref1;
          return _ref1 = address.split(':'), this.host = _ref1[0], this.port = _ref1[1], _ref1;
        }
      });
      dummy.address = 'localhost:1337';
      expect(dummy.host).to.equal('localhost');
      return expect(dummy.port).to.equal('1337');
    });
    return it('passes through options', function() {
      var reader, spy;
      spy = this.sandbox.spy(Object, 'defineProperty');
      set({
        options: reader = function() {}
      });
      return expect(spy).to.have.been.calledWith(dummy, 'options', {
        set: reader,
        enumerable: true
      });
    });
  });
  describe('.readers', function() {
    return it('returns reader factories for given objects', function() {
      sinon.stub(attr, 'reader').returnsArg(0);
      return expect(attr.readers(1, 2)).to.eql([1, 2]);
    });
  });
  return describe('.writers', function() {
    return it('returns write factories for given objects', function() {
      sinon.stub(attr, 'writer').returnsArg(0);
      return expect(attr.writers(1, 2)).to.eql([1, 2]);
    });
  });
});
