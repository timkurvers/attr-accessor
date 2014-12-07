var attr, expect, sinon, _ref;

_ref = require('./spec-helper'), attr = _ref.attr, expect = _ref.expect, sinon = _ref.sinon;

describe('attr', function() {
  describe('.reader', function() {
    var dummy, get;
    dummy = {};
    get = attr.reader(dummy, {
      enumerable: true
    });
    it('returns a getter factory', function() {
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
        configurable: true,
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
    it('returns a setter factory', function() {
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
      var spy, writer;
      spy = this.sandbox.spy(Object, 'defineProperty');
      set({
        options: writer = function() {}
      });
      return expect(spy).to.have.been.calledWith(dummy, 'options', {
        set: writer,
        configurable: true,
        enumerable: true
      });
    });
  });
  describe('.accessor', function() {
    var dummy;
    dummy = {};
    return it('returns getter and setter factories', function() {
      var get, set, _ref1;
      this.sandbox.stub(attr, 'reader').withArgs(dummy).returns(0);
      this.sandbox.stub(attr, 'writer').withArgs(dummy).returns(1);
      _ref1 = attr.accessor(dummy), get = _ref1[0], set = _ref1[1];
      expect(get).to.equal(0);
      return expect(set).to.equal(1);
    });
  });
  return describe('.accessors', function() {
    var Dummy;
    Dummy = (function() {
      function Dummy() {}

      return Dummy;

    })();
    before(function() {
      var accessor;
      accessor = this.sandbox.stub(attr, 'accessor');
      accessor.withArgs(Dummy.prototype, {
        enumerable: true
      }).returns([0, 1]);
      return accessor.withArgs(Dummy).returns([2, 3]);
    });
    it('returns enumerable prototype getter and setter factories', function() {
      var get, set, _ref1;
      _ref1 = attr.accessors(Dummy), get = _ref1[0], set = _ref1[1];
      expect(get).to.equal(0);
      return expect(set).to.equal(1);
    });
    return it('returns static getter and setter factories', function() {
      var get, set, _, _ref1;
      _ref1 = attr.accessors(Dummy), _ = _ref1[0], _ = _ref1[1], get = _ref1[2], set = _ref1[3];
      expect(get).to.equal(2);
      return expect(set).to.equal(3);
    });
  });
});
