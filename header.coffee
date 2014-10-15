header = require('gulp-header')

module.exports = (pkg) ->
  header("""
    /**
     * #{pkg.name} v#{pkg.version}
     * Copyright (c) 2014 #{pkg.author}
     *
     * #{pkg.description}.
     *
     * Licensed under the #{pkg.license} license.
     */\n\n
    """)
