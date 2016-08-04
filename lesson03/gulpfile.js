var destDir = 'bin';
var gulp = require('gulp');
var bower = require('gulp-bower');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var less = require('gulp-less');
var argv = require('yargs').argv;
var debug = require( 'gulp-debug' );
var clean = require( 'gulp-clean' );
var csscomb = require('gulp-csscomb');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var htmlhint = require('gulp-htmlhint');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var gitmodified = require('gulp-gitmodified');

gulp.task('bower', function () {
    return bower();
});

gulp.task('build', ['copy-static', 'css', 'js']);

gulp.task('copy-static', ['images', 'html']);

gulp.task('libs', function () {
    return gulp.src(['client_src/libs/**/*.min.js', '!client_src/libs/**/src/**/*.*'])
        .pipe(gulp.dest(destDir+'/libs'));
});

gulp.task('images', function () {
    return gulp.src(['client_src/**/*.{png,jpg,svg}', '!client_src/libs/**/*.*'])
        .pipe(gulp.dest(destDir));
});

gulp.task('html', function () {
    return gulp.src(['client_src/**/*.html', '!client_src/libs/**/*.*'])
        .pipe(gulpif(argv.prod, htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest(destDir));
});

gulp.task('css', function () {
    return gulp.src(['client_src/**/*.less', '!client_src/libs/**/*.*'])
        .pipe(gulpif(!argv.prod, sourcemaps.init()))
        .pipe(concat('styles.css'))
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(gulpif(!argv.prod, sourcemaps.write()))
        .pipe(gulp.dest(destDir + '/static'));
});

gulp.task('js', function () {
    return gulp.src(['client_src/**/*.js', '!client_src/libs/**/*.*'])
        .pipe(gulpif(!argv.prod, sourcemaps.init()))
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulpif(!argv.prod, sourcemaps.write()))
        .pipe(gulp.dest(destDir));
});

gulp.task( 'clean', function () {
    return gulp.src( destDir + '/*', { read: false } )
        .pipe( clean( { force: true } ) );
});


gulp.task( 'watch', function () {
    gulp.watch(['client_src/**/*.less', '!client_src/libs/**/*.*'], [ 'css' ] );
    gulp.watch(['client_src/**/*.{png,jpg,svg}', '!client_src/libs/**/*.*'], [ 'images' ] );
    gulp.watch(['client_src/**/*.html', '!client_src/libs/**/*.*'], [ 'html' ] );
    gulp.watch(['client_src/**/*.js', '!client_src/libs/**/*.*'], [ 'js' ] );
});

gulp.task( 'serve', function () {
    browserSync.init({
        server: 'bin'
    });
    browserSync.watch('bin/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['libs', 'build', 'watch','serve']);


//CODESTYLE
gulp.task('csscomb', function () {
    return gulp.src(['client_src/**/*.less', '!client_src/libs/**/*.*'])
        .pipe(gulpif(!argv.all,gitmodified('modified')))
        .pipe(csscomb().on('error', handleError))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

gulp.task('htmlhint', function () {
    return gulp.src(['client_src/**/*.html', '!client_src/libs/**/*.*'])
        .pipe(gulpif(!argv.all,gitmodified('modified')))
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.reporter());
});

gulp.task('jscs', function () {
    return gulp.src(['client_src/**/*.js', '!client_src/libs/**/*.*'])
        .pipe(gulpif(!argv.all,gitmodified('modified')))
        .pipe(jscs({fix: true}))
        .pipe(jscs.reporter())
        .pipe(gulp.dest('client_src'));
});

gulp.task('jshint', function () {
    return gulp.src(['client_src/**/*.js', '!client_src/libs/**/*.*'])
        .pipe(gulpif(!argv.all,gitmodified('modified')))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('style', function () {
    runSequence('jshint', 'jscs', 'htmlhint', 'csscomb');
});

// CODESTYLE

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
    return this;
}

