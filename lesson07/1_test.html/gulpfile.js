var gulp = require('gulp');
var bower = require('gulp-bower');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var less = require('gulp-less');
var argv = require('yargs').argv;
var clean = require( 'gulp-clean' );
var livereload = require('gulp-livereload');
var handlebars = require('gulp-handlebars');
var wrap = require( 'gulp-wrap' );
var declare = require( 'gulp-declare' );
var runSequence = require('run-sequence');
var browserify = require( 'gulp-browserify' );

var DEST_DIR = 'client_build';
var CLIENT_DIR = 'client_src';
var CLIENT_LIBS_DIR = CLIENT_DIR + '/libs';

gulp.task('default', function (cb) {
    runSequence('build', 'bower', cb);
});

gulp.task('dev', ['build'], function (cb) {
    runSequence('watch');
});

gulp.task('build', function (cb) {
    runSequence( 
        'clean-build', 
        'copy-src',
        cb 
    );
});

gulp.task('copy-src', function () {
    return gulp.src(CLIENT_DIR + '/**')
        .pipe(gulp.dest(DEST_DIR));
});

gulp.task('bower', function() {
    return bower(CLIENT_LIBS_DIR);
});

gulp.task('clean-build', function (cb) {
    return gulp.src(DEST_DIR + '/*', {read: false})
        .pipe(clean({force: true}));
} );
   
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(CLIENT_DIR + '/**/*.@(html|js|css|hbs)', ['build-and-reload']); 
});

gulp.task('build-and-reload', ['build'], function () {
    return gulp.src(DEST_DIR + '/**')
        .pipe(livereload());
});
