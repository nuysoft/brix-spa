/* global require */
var gulp = require('gulp')
var jshint = require('gulp-jshint')
var rjs = require('gulp-requirejs')
var connect = require('gulp-connect')

var globs = ['src/**/*.js', 'test/*.js', 'gulpfile.js']
var watchTasks = ['jshint', 'rjs']

// https://github.com/spenceralger/gulp-jshint
gulp.task('jshint', function() {
	return gulp.src(globs)
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
})

// https://github.com/RobinThrift/gulp-requirejs
// http://requirejs.org/docs/optimization.html#empty
gulp.task('rjs', function() {
	var build = {
		baseUrl: 'src',
		name: 'brix/spa',
		out: 'dist/spa.js',
		paths: {
			jquery: 'empty:',
			underscore: 'empty:',
			director: 'empty:',
			'URIjs': 'empty:',
			page: 'empty:',
			'brix/loader': 'empty:'
		}
	}
	rjs(build)
		.pipe(gulp.dest('.')) // pipe it to the output DIR
})

// https://github.com/floatdrop/gulp-watch
gulp.task('watch', function( /*callback*/ ) {
	gulp.watch(globs, watchTasks)
})

// https://github.com/AveVlad/gulp-connect
gulp.task('connect', function() {
	connect.server({
		port: 4244
	})
})

gulp.task('default', watchTasks.concat(['watch', 'connect']))