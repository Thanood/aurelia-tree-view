var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var paths = require('../paths');

// outputs changes to files to the console
function reportChange(vinyl) {
    // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    console.log('File ' + vinyl.event + ': ' + vinyl.relative + ', running tasks...');
}

// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
gulp.task('watch', ['serve'], function() {
  var bs = browserSync.get('Sample server');

  // gulp.watch(paths.source, ['build-dev', bs.reload]).on('change', reportChange);
  // gulp.watch(paths.html, ['copy-html', bs.reload]).on('change', reportChange);
  // gulp.watch(paths.sass, ['build-sass', bs.reload]).on('change', reportChange);
  // gulp.watch(paths.sampleStyle, bs.reload).on('change', reportChange);
  // gulp.watch(paths.sampleSrc, bs.reload).on('change', reportChange);
  // gulp.watch(paths.sampleHtml, bs.reload).on('change', reportChange);

  watch(paths.source, function(vinyl) {
    reportChange(vinyl);
    runSequence('build-dev', bs.reload);
  });
  watch(paths.html, function(vinyl) {
    reportChange(vinyl);
    runSequence('copy-html', bs.reload);
  });
  watch(paths.sass, function(vinyl) {
    reportChange(vinyl);
    runSequence('build-sass', bs.reload);
  });
  watch(paths.sampleStyle, function(vinyl) {
    reportChange(vinyl);
    bs.reload();
  });
  watch(paths.sampleSrc, function(vinyl) {
    reportChange(vinyl);
    bs.reload();
  });
  watch(paths.sampleHtml, function(vinyl) {
    reportChange(vinyl);
    bs.reload();
  });
  watch(paths.sampleJson, function(vinyl) {
    reportChange(vinyl);
    bs.reload();
  });
});
