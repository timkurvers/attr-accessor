import attr from '../';
import bridge from 'sinon-chai';
import chai from 'chai';
import sinon from 'sinon';

chai.use(bridge);

export default {
  attr: attr,
  expect: chai.expect,
  sinon: sinon
};

beforeEach(function() {
  this.sandbox = sinon.sandbox.create();
});

afterEach(function() {
  this.sandbox.restore();
});
