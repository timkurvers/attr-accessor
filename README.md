# Attr Accessor

[![Version](https://img.shields.io/npm/v/attr-accessor.svg)](https://www.npmjs.org/package/attr-accessor)
[![Build Status](https://img.shields.io/travis/timkurvers/attr-accessor.svg)](https://travis-ci.org/timkurvers/attr-accessor)
[![Maintainability](https://img.shields.io/codeclimate/maintainability/timkurvers/attr-accessor.svg)](https://codeclimate.com/github/timkurvers/attr-accessor)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/timkurvers/attr-accessor.svg)](https://codeclimate.com/github/timkurvers/attr-accessor)
[![Known Vulnerabilities](https://snyk.io/test/github/timkurvers/attr-accessor/badge.svg)](https://snyk.io/test/github/timkurvers/attr-accessor)

Convenience factories for creating getter/setters.

Licensed under the [**MIT** license](LICENSE.md).

## Installation

Attr Accessor is available via [npm]:

```shell
npm install attr-accessor
```

Or for usage in the browser:

- `dist/attr-accessor.js`
- `dist/attr-accessor.min.js`

## Usage

Pass in an object to `attr.reader` or `attr.writer` to obtain a getter or setter
factory respectively:

```javascript
get = attr.reader(object)
set = attr.writer(object)
```

[ES2015] introduced classes and has support for getter/setters.

CoffeeScript, on the other hand, has had no elegant way of defining getter/setters,
until now. Use its destructuring syntax in combination with `attr.accessor` to
obtain both factories:

```javascript
[get, set] = attr.accessor(object)
```

Use `attr.accessors` when dealing with classes to obtain two prototypal /
instance-bound factories as well as two static factories:

```javascript
[get, set, @get, @set] = attr.accessors(object)
```

### Example

```coffeescript
class Person
  [get, set, @get, @set] = attr.accessors(this)

  group = []

  constructor: (@firstName, @lastName) ->
    group.push this

  get name: ->
    "#{@firstName} #{@lastName}"

  @get count: ->
    group.length
```

```coffeescript
new Person('John', 'Doe').name # John Doe
Person.count # 1
```

## Development & Contribution

Attr Accessor is written in [ES2015], compiled by [Babel], developed with [Gulp]
and tested through [Mocha].

Getting this toolchain up and running, is easy and straight-forward:

1. Get the code:

   ```shell
   git clone git://github.com/timkurvers/attr-accessor.git
   ```

2. Download and install [Node.js] – including `npm` – for your platform.

3. Install dependencies:

   ```shell
   npm install
   ```

4. Run `npm run gulp` which will automatically build and test the project when
   source files change.

When contributing, please:

- Fork the repository
- Accompany each logical unit of operation with at least one test
- Open a pull request
- Do *not* include any distribution files (such as `dist/attr-accessor.js`)

[Babel]: https://babeljs.io/
[ES2015]: http://babeljs.io/docs/learn-es2015/
[Gulp]: http://gulpjs.com/
[Mocha]: http://mochajs.org/
[Node.js]: http://nodejs.org/#download
[npm]: https://www.npmjs.com/
