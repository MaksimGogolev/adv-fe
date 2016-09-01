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
var ctCreator = require( 'ct-creator' );
var Server = require('karma').Server;
var webdriver = require( 'gulp-webdriver' );
var selenium = require('selenium-standalone');

var DEST_DIR = 'client_build';
var DEST_LIBS_DIR = DEST_DIR + '/libs';
var CLIENT_DIR = 'client_src';

gulp.task('default', function (cb) {
    runSequence('build', cb);
});

gulp.task('dev', ['build'], function (cb) {
    runSequence('watch');
});

gulp.task('build', function (cb) {
    runSequence( 
        'clean-build', 
        'copy-src', 
        ['bower', 'browserify', 'templates', 'concat-component-css'],
        cb 
    );
});

gulp.task('browserify', function () {
    gulp.src('client_src/form.js')
        .pipe(browserify({
            insertGlobals: true,
            paths: ['client_src'],
            debug: !gulp.env.production
        }))
        .pipe(gulp.dest(DEST_DIR));
} );

gulp.task('copy-src', function () {
    return gulp.src(CLIENT_DIR + '/**')
        .pipe(gulp.dest(DEST_DIR));
});

gulp.task('bower', function() {
    return bower(DEST_LIBS_DIR);
});

gulp.task('concat-component-css', function () {
    return gulp.src(CLIENT_DIR + '/**/*.css' )
        .pipe(concat('components.css'))
        .pipe(less())
        .pipe(gulp.dest(DEST_DIR));
} );

gulp.task('templates', function() {
    return gulp.src(CLIENT_DIR + '/**/*.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
              namespace: 'App.templates',
              noRedeclare: true, 
        })) 
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(DEST_DIR));
});

gulp.task('clean-build', function (cb) {
    return gulp.src(DEST_DIR + '/*', {read: false})
        .pipe(clean({force: true}));
} );
   
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(CLIENT_DIR + '/**/*.@(html|js|css|hbs)', ['build-and-reload', 'tdd']);
});

gulp.task('build-and-reload', ['build'], function () {
    return gulp.src(DEST_DIR + '/**')
        .pipe(livereload());
});

// Compoment creator
gulp.task('component', function () {
    ctCreator.create('client_src/components', argv.name);
});

gulp.task('container', function () {
    ctCreator.create('client_src/containers/', argv.name);
});


// tests
gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

gulp.task('selenium', function (done) {
    selenium.install({
        logger: function (message) {
        }
    }, function (err) {
        if (err) return done(err);

        selenium.start(function (err, child) {
            if (err) return done(err);
            selenium.child = child;
            done();
        });
    });
});

gulp.task('e2e', function() {

    return gulp.src('wdio.conf.js').pipe(webdriver({
        desiredCapabilities: {
            browserName: 'chrome'
        }
    }));
});
