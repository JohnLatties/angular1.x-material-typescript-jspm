var gulp = require('gulp');
var shell = require('gulp-shell');
var config = require('../../config').scripts.production;
var jspm = require('jspm');
var source = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('scripts-bundle', function () {
  var builder = new jspm.Builder({
    baseURL: "./"
  });

  return builder.buildStatic(config.source, { format: 'amd', sourceMaps: true }).then(function (output) {
    var stream = source('app.js');

    stream.write(output.source);
    process.nextTick(function () {
      stream.end();
    });

    return stream.pipe(vinylBuffer())
      //.pipe(sourcemaps.init())
      .pipe(ngAnnotate())
      //.pipe(uglify())
      //.pipe(rename({ suffix: '.min' }))
      //.pipe(sourcemaps.write())
      .pipe(gulp.dest(config.dest));
  });
});
