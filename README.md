# Attr Accessor

[![Version](https://img.shields.io/npm/v/attr-accessor.svg?style=flat)](https://www.npmjs.org/package/attr-accessor)
[![Build Status](https://img.shields.io/travis/timkurvers/attr-accessor.svg?style=flat)](https://travis-ci.org/timkurvers/attr-accessor)
[![Dependency Status](https://img.shields.io/gemnasium/timkurvers/attr-accessor.svg?style=flat)](https://gemnasium.com/timkurvers/attr-accessor)
[![Code Climate](https://img.shields.io/codeclimate/github/timkurvers/attr-accessor.svg?style=flat)](https://codeclimate.com/github/timkurvers/attr-accessor)

Convenience factories for creating getter/setters.

Licensed under the **MIT** license, see LICENSE for more information.


## Usage

Pass in an object to `attr.reader` or `attr.writer` to obtain a getter or setter
factory respectively:

```
get = attr.reader(object)
set = attr.writer(object)
```

CoffeeScript has had no elegant way of defining getter/setters, until now. Use its
destructuring syntax in combination with `attr.accessor` to obtain both factories:

`[get, set] = attr.accessor(object)`

Use `attr.accessors` when dealing with classes to obtain two prototypal /
instance-bound factories as well as two static factories:

`[get, set, @get, @set] = attr.accessors(object)`


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


## Browser Support

[![Testling](https://ci.testling.com/timkurvers/attr-accessor.png)](https://ci.testling.com/timkurvers/attr-accessor)


## Development & Contribution

When contributing, please:

* Fork the repository
* Accompany each logical unit of operation with at least one test
* Open a pull request
* Do *not* include any distribution files
