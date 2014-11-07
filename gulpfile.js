var gulp = require('gulp')
var connect = require('gulp-connect')

gulp.task('connect', function() {
    connect.server({
        port: 4244
    })
})

gulp.task('default', ['connect'])