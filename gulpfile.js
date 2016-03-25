// Include gulp
var gulp = require('gulp');

// Include Plugins
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var filesize = require('gulp-filesize');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var minifyCss = require('gulp-minify-css');

//clean
gulp.task('clean', function () {
  return gulp.src('build', {read: false})
    .pipe(clean());
});

// jshint
gulp.task('jshint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS | concat, rename, uglify
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(filesize())
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(filesize());
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['jshint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

//Minify css
gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
  	.pipe(concat('main.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(filesize())
    .pipe(rename('main.min.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(filesize());
});

// Default Task
gulp.task('default', ['clean', 'jshint', 'sass', 'scripts', 'watch', 'minify-css']);
