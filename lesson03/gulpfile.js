var destDir = 'bin';
var gulp = require('gulp');
var bower = require('gulp-bower');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var less = require('gulp-less');
var argv = require('yargs').argv;
var debug = require( 'gulp-debug' );
var clean = require( 'gulp-clean' );
var livereload = require('gulp-livereload');
var csscomb = require('gulp-csscomb');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

gulp.task('default', ['libs', 'build']);

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
        .pipe(gulpif(!argv.prod, sourcemaps.init()))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulpif(!argv.prod, sourcemaps.write()))
        .pipe(gulp.dest(destDir));
});

gulp.task('css', function () {
    return gulp.src(['client_src/**/*.less', '!client_src/libs/**/*.*'])
        .pipe(gulpif(!argv.prod, sourcemaps.init()))
        .pipe(concat('styles.css'))
        .pipe(less())
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
} );


gulp.task( 'watch', function () {
    gulp.watch(['client_src/**/*.less', '!client_src/libs/**/*.*'], [ 'css' ] );
    gulp.watch(['client_src/**/*.{png,jpg,svg}', '!client_src/libs/**/*.*'], [ 'images' ] );
    gulp.watch(['client_src/**/*.html', '!client_src/libs/**/*.*'], [ 'html' ] );
    gulp.watch(['client_src/**/*.js', '!client_src/libs/**/*.*'], [ 'js' ] );
} );

gulp.task( 'reload-page', function () {
} );

//
// //CODESTYLE
// gulp.task('csscomb', function () {
//     return gulp.src('styles/*.less')
//         .pipe(csscomb().on('error', handleError))
//         .pipe(gulp.dest(function (file) {
//             return file.base;
//         }));
// });
//
// gulp.task('htmlhint', function () {
// });
//
// gulp.task('jscs', function () {
// });
//
// gulp.task('jshint', function () {
// });
//
// gulp.task('style', function () {
// });
//
// //CODESTYLE//
//
// function handleError(err) {
//     console.log(err.toString());
//     this.emit('end');
//     return this;
// }
//
