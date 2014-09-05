var attr, expect, sinon, _ref;

_ref = require('./spec-helper'), attr = _ref.attr, expect = _ref.expect, sinon = _ref.sinon;

describe('attr', function() {
  describe('.accessor', function() {
    return it('returns a reader and writer factory for given object');
  });
  describe('.reader', function() {
    var dummy, get;
    dummy = {};
    get = attr.reader(dummy);
    it('returns a reader factory for given object', function() {
      return expect(get).to.be.callable;
    });
    return it('creates a getter through factory', function() {
      get({
        name: function() {
          return 'Tim Kurvers';
        }
      });
      return expect(dummy.name).to.equal('Tim Kurvers');
    });
  });
  describe('.writer', function() {
    var dummy, set;
    dummy = {};
    set = attr.writer(dummy);
    it('returns a writer factory for given object', function() {
      return expect(set).to.be.callable;
    });
    return it('creates a setter through factory', function() {
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
