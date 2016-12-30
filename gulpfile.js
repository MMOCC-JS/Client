var gulp = require('gulp'),

    jade = require('gulp-jade'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),

    gutil = require('gulp-util'),
    clean = require('gulp-clean');

var production = gutil.env.production,
    outputDir = 'builds/' + (production ? 'production' : 'development');

var filesToMove = [
    './resources/badges/**/*.*',
    './resources/gamedata/**/*.*',
    './resources/icons/**/*.*',
    './resources/images/**/*.*',
    './resources/libraries/**/*.*',
    './resources/spritesheets/*.*'
];

gulp.task('jade', function() {
    return gulp.src('src/templates/index.jade')
        .pipe(jade())
        .pipe(gulp.dest(outputDir));
});

gulp.task('js', function() {
    return gulp.src('src/js/index.js')
        .pipe(browserify({ debug: !production }))
        .pipe(production ? uglify() : gutil.noop())
        .pipe(gulp.dest(outputDir));
});

gulp.task('sass', function() {
    return gulp.src('src/sass/index.scss')
        .pipe(!production ? sourcemaps.init() : gutil.noop())
        .pipe(sass({ outputStyle: (production ? 'compressed' : 'nested') }))
        .pipe(!production ? sourcemaps.write() : gutil.noop())
        .pipe(gulp.dest(outputDir));
});

gulp.task('clean', function() {
    return gulp.src(outputDir + '/*', { read: false })
        .pipe(clean());
});

gulp.task('move', function() {
    gulp.src(filesToMove, { base: './resources/' })
        .pipe(gulp.dest(outputDir));
});


gulp.task('default', ['jade', 'js', 'sass', 'move']);