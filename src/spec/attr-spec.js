import { attr, expect } from './spec-helper';

describe('attr', function() {

  describe('.reader', function() {
    const dummy = {};
    const get = attr.reader(dummy, { enumerable: true });

    it('returns a getter factory', function() {
      get({
        name: function() {
          return 'Tim Kurvers';
        }
      });
      expect(dummy.name).to.equal('Tim Kurvers');
    });

    it('passes through options', function() {
      const spy = this.sandbox.spy(Object, 'defineProperty');
      const reader = function() {};
      get({ options: reader });
      expect(spy).to.have.been.calledWith(
        dummy, 'options', { get: reader, configurable: true, enumerable: true }
      );
    });
  });

  describe('.writer', function() {
    const dummy = {};
    const set = attr.writer(dummy, { enumerable: true });

    it('returns a setter factory', function() {
      set({
        address: function(address) {
          [this.host, this.port] = address.split(':');
        }
      });
      dummy.address = 'localhost:1337';
      expect(dummy.host).to.equal('localhost');
      expect(dummy.port).to.equal('1337');
    });

    it('passes through options', function() {
      const spy = this.sandbox.spy(Object, 'defineProperty');
      const writer = function() {};
      set({ options: writer });
      expect(spy).to.have.been.calledWith(
        dummy, 'options', { set: writer, configurable: true, enumerable: true }
      );
    });
  });

  describe('.accessor', function() {
    const dummy = {};

    it('returns getter and setter factories', function() {
      this.sandbox.stub(attr, 'reader').withArgs(dummy).returns(0);
      this.sandbox.stub(attr, 'writer').withArgs(dummy).returns(1);
      const [get, set] = attr.accessor(dummy);
      expect(get).to.equal(0);
      expect(set).to.equal(1);
    });
  });

  describe('.accessors', function() {
    class Dummy {}

    before(function() {
      const accessor = this.sandbox.stub(attr, 'accessor');
      accessor.withArgs(Dummy.prototype, { enumerable: true }).returns([0, 1]);
      accessor.withArgs(Dummy).returns([2, 3]);
    });

    it('returns enumerable prototype getter and setter factories', function() {
      const [get, set] = attr.accessors(Dummy);
      expect(get).to.equal(0);
      expect(set).to.equal(1);
    });

    it('returns static getter and setter factories', function() {
      const [_, __, get, set] = attr.accessors(Dummy);
      expect(get).to.equal(2);
      expect(set).to.equal(3);
    });
  });

});
