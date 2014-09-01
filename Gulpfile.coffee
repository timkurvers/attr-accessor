browserify = require('gulp-browserify')
clean      = require('gulp-rimraf')
coffee     = require('gulp-coffee')
gulp       = require('gulp')
mocha      = require('gulp-mocha')
plumber    = require('gulp-plumber')
pkg        = require('./package.json')
rename     = require('gulp-rename')
uglify     = require('gulp-uglify')

gulp.task 'clean', ->
  gulp.src(['lib/**/*', 'dist/**/*'])
      .pipe(clean())

gulp.task 'build', ->
  gulp.src('src/**/*.coffee')
      .pipe(plumber())
      .pipe(coffee(bare: true))
      .pipe(gulp.dest('lib'))

gulp.task 'spec', ->
  gulp.src('spec/**/*.coffee', read: false)
      .pipe(plumber())
      .pipe(mocha())

gulp.task 'release', gulp.series 'clean', 'build', ->
  gulp.src('lib/attr.js')
      .pipe(browserify(standalone: 'attr'))
      .pipe(rename("#{pkg.name}.js"))
      .pipe(gulp.dest('dist'))
      .pipe(uglify())
      .pipe(rename("#{pkg.name}.min.js"))
      .pipe(gulp.dest('dist'))

gulp.task 'flow', gulp.series('build', 'spec')

gulp.task 'watch', ->
  gulp.watch [
    'src/**/*.coffee',
    'spec/**/*.coffee'
  ], 'flow'

gulp.task 'default', gulp.series('flow', 'watch')
