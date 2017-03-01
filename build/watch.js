var copy = require('copyfiles');
var gaze = require('gaze');

gaze('src/**/*.html', function(err, watcher) {
    this.on('all', function(event, filepath) {
        console.log(filepath + ' was ' + event);
        copy(['src/**/*.html', 'src/**/*.css', 'dist/system'], 1, function() {
            console.log('files copied');
        });
    });
});
