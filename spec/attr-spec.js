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
  return describe('.accessor', function() {
    var Dummy;
    Dummy = (function() {
      function Dummy() {}

      return Dummy;

    })();
    it('exposes an enumerable prototype getter and setter', function() {
      var get, set, _ref1;
      this.sandbox.stub(attr, 'reader').withArgs(Dummy.prototype, {
        enumerable: true
      }).returns(0);
      this.sandbox.stub(attr, 'writer').withArgs(Dummy.prototype, {
        enumerable: true
      }).returns(1);
      _ref1 = attr.accessor(Dummy), get = _ref1[0], set = _ref1[1];
      expect(get).to.equal(0);
      return expect(set).to.equal(1);
    });
    return it('exposes a static getter and setter', function() {
      var _, _ref1;
      this.sandbox.stub(attr, 'reader').withArgs(Dummy).returns(0);
      this.sandbox.stub(attr, 'writer').withArgs(Dummy).returns(1);
      _ref1 = attr.accessor(Dummy), _ = _ref1[0], _ = _ref1[1], this.get = _ref1[2], this.set = _ref1[3];
      expect(this.get).to.equal(0);
      return expect(this.set).to.equal(1);
    });
  });
});
