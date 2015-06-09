'use strict';

var chai = require('chai');
var sinon = require('sinon');
var bridge = require('sinon-chai');

chai.use(bridge);

module.exports = {
  attr: require('../'),
  expect: chai.expect,
  sinon: sinon
};

beforeEach(function () {
  this.sandbox = sinon.sandbox.create();
});

afterEach(function () {
  this.sandbox.restore();
});