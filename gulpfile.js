/* global require, console */
var gulp = require('gulp')
var through = require('through2')
var jshint = require('gulp-jshint')
var rjs = require('gulp-requirejs')
var uglify = require('gulp-uglify')
var exec = require('child_process').exec
var connect = require('gulp-connect')

var globs = ['src/**/*.js', 'test/*.js', 'gulpfile.js']
var watchTasks = ['madge', 'jshint', 'rjs', 'compress']

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

	rjs({
			baseUrl: 'src',
			name: 'brix/doom',
			out: 'dist/doom.js'
		})
		.pipe(gulp.dest('.')) // pipe it to the output DIR
})

// https://github.com/terinjokes/gulp-uglify
gulp.task('compress', function() {
    gulp.src(['dist/**.js','!dist/**-debug.js'])
        .pipe(through.obj(function(file, encoding, callback) { /* jshint unused:false */
            file.path = file.path.replace(
                '.js',
                '-debug.js'
            )
            callback(null, file)
        }))
        .pipe(gulp.dest('dist/'))
    gulp.src(['dist/**.js','!dist/**-debug.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
})

// https://github.com/pahen/madge
gulp.task('madge', function( /*callback*/ ) {
    exec('madge --format amd ./src/',
        function(error, stdout /*, stderr*/ ) {
            if (error) console.log('exec error: ' + error)
            console.log('module dependencies:')
            console.log(stdout)
        }
    )
    exec('madge --format amd --image ./doc/dependencies.png ./src/',
        function(error /*, stdout, stderr*/ ) {
            if (error) console.log('exec error: ' + error)
        }
    )
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