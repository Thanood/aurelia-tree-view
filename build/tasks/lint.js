var gulp = require('gulp');
var paths = require('../paths');
var eslint = require('gulp-eslint');
var templateLinter = require('gulp-aurelia-template-lint');
var templateLinterConfig = new (require('aurelia-template-lint').Config);

gulp.task('lint', function() {
  return gulp.src([paths.source, paths.sampleSrc, paths.tests])
  .pipe(eslint())
  .pipe(eslint.format());
  // .pipe(eslint.failOnError());
});

gulp.task('template-lint', function() {
  // templateLinterConfig.obsoleteTagOpts.push({tag:"ul"});
  return gulp.src(paths.html)
    .pipe(templateLinter(templateLinterConfig));
});
