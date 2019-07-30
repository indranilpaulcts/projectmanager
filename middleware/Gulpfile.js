var gulp = require('gulp');
var spawn = require('child_process').spawn;

var mongodbpath = 'C:\\Program Files\\MongoDB\\Server\\3.4\\bin\\mongod';

gulp.task('serve', function() {
    spawn(mongodbpath, { stdio: 'inherit' });
    spawn('node', ['server.js'], { stdio: 'inherit' });
});
