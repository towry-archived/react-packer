var gulp = require('gulp');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var blinkr = require('blinkr');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');

/*?
Note that the `blinkr` module is only work on Windows,
If there is any error just dont use it.
*/

gulp.task('js', function () {
  return browserify('./src/index.js', {
      debug: true
    })
    .transform(reactify)
    .bundle()
    .on('error', function (err) {
      blinkr.blink();
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/'));
})

gulp.task('default', function () {
  gulp.watch('src/index.js', ['js']);
})

gulp.task('dist', function () {
  return browserify('./src/index.js')
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
})
