# Attr Accessor

[![Version 0.0.0](https://img.shields.io/badge/version-0.0.0-blue.svg?style=flat)](https://github.com/timkurvers/attr-accessor/tree/master)
[![Build Status](https://img.shields.io/travis/timkurvers/attr-accessor.svg?style=flat)](https://travis-ci.org/timkurvers/attr-accessor)
[![Dependency Status](https://img.shields.io/gemnasium/timkurvers/attr-accessor.svg?style=flat)](https://gemnasium.com/timkurvers/attr-accessor)
[![Code Climate](https://img.shields.io/codeclimate/github/timkurvers/attr-accessor.svg?style=flat)](https://codeclimate.com/github/timkurvers/attr-accessor)

Convenience factories for creating getter/setters.

Licensed under the **MIT** license, see LICENSE for more information.


## Usage

Pass in an object to `attr.reader` or `attr.writer` to obtain a factory.
Use the plural methods `attr.readers` or `attr.writers` to obtain multiple.

CoffeeScript has had no elegant way of defining getter/setters, until now.
Use its destructuring syntax to conveniently obtain prototype and static factories.

```coffeescript
class Person
  [get, @get] = attr.readers(@::, @)

  group = []

  constructor: (@firstName, @lastName) ->
    group.push @

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
