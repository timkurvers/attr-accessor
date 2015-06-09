'use strict';

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _require = require('./spec-helper');

var attr = _require.attr;
var expect = _require.expect;
var sinon = _require.sinon;

describe('attr', function () {

  describe('.reader', function () {
    var dummy = {};
    var get = attr.reader(dummy, { enumerable: true });

    it('returns a getter factory', function () {
      get({ name: function name() {
          return 'Tim Kurvers';
        } });
      expect(dummy.name).to.equal('Tim Kurvers');
    });

    it('passes through options', function () {
      var spy = this.sandbox.spy(Object, 'defineProperty');
      var reader = function reader() {};
      get({ options: reader });
      expect(spy).to.have.been.calledWith(dummy, 'options', { get: reader, configurable: true, enumerable: true });
    });
  });

  describe('.writer', function () {
    var dummy = {};
    var set = attr.writer(dummy, { enumerable: true });

    it('returns a setter factory', function () {
      set({ address: function address(_address) {
          var _address$split = _address.split(':');

          var _address$split2 = _slicedToArray(_address$split, 2);

          this.host = _address$split2[0];
          this.port = _address$split2[1];
        } });
      dummy.address = 'localhost:1337';
      expect(dummy.host).to.equal('localhost');
      expect(dummy.port).to.equal('1337');
    });

    it('passes through options', function () {
      var spy = this.sandbox.spy(Object, 'defineProperty');
      var writer = function writer() {};
      set({ options: writer });
      expect(spy).to.have.been.calledWith(dummy, 'options', { set: writer, configurable: true, enumerable: true });
    });
  });

  describe('.accessor', function () {
    var dummy = {};

    it('returns getter and setter factories', function () {
      this.sandbox.stub(attr, 'reader').withArgs(dummy).returns(0);
      this.sandbox.stub(attr, 'writer').withArgs(dummy).returns(1);

      var _attr$accessor = attr.accessor(dummy);

      var _attr$accessor2 = _slicedToArray(_attr$accessor, 2);

      var get = _attr$accessor2[0];
      var set = _attr$accessor2[1];

      expect(get).to.equal(0);
      expect(set).to.equal(1);
    });
  });

  describe('.accessors', function () {
    var Dummy = function Dummy() {
      _classCallCheck(this, Dummy);
    };

    before(function () {
      var accessor = this.sandbox.stub(attr, 'accessor');
      accessor.withArgs(Dummy.prototype, { enumerable: true }).returns([0, 1]);
      accessor.withArgs(Dummy).returns([2, 3]);
    });

    it('returns enumerable prototype getter and setter factories', function () {
      var _attr$accessors = attr.accessors(Dummy);

      var _attr$accessors2 = _slicedToArray(_attr$accessors, 2);

      var get = _attr$accessors2[0];
      var set = _attr$accessors2[1];

      expect(get).to.equal(0);
      expect(set).to.equal(1);
    });

    it('returns static getter and setter factories', function () {
      var _attr$accessors3 = attr.accessors(Dummy);

      var _attr$accessors32 = _slicedToArray(_attr$accessors3, 4);

      var _ = _attr$accessors32[0];
      var _ = _attr$accessors32[1];
      var get = _attr$accessors32[2];
      var set = _attr$accessors32[3];

      expect(get).to.equal(2);
      expect(set).to.equal(3);
    });
  });
});