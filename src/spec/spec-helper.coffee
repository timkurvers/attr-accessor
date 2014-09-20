chai   = require('chai')
sinon  = require('sinon')
bridge = require('sinon-chai')
chai.use(bridge)

module.exports = {
  attr:   require('../')
  expect: chai.expect,
  sinon:  sinon
}

beforeEach ->
  @sandbox = sinon.sandbox.create()

afterEach ->
  @sandbox.restore()
