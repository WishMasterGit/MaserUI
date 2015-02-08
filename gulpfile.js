/**
 * Created by Stas on 2/6/2015.
 */
var gulp = require('gulp'),
    browserify = require('browserify'),
    streamify = require('gulp-streamify'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat');

var files = [
    'src/LibStart.js',
    'src/maserUI.js',
    'src/controls/Panel.js',
    'src/controls/TextBlock.js',
    'src/controls/Button.js',
    'src/controls/ToggleSwitch.js',
    'src/controls/Slider.js',
    'src/controls/StackPanel.js',
    'src/controls/ListBox.js',
    'src/LibEnd.js'

];
gulp.task('debug', function () {
    return gulp.src(files)
        .pipe(concat('maserUI.js'))
        .pipe(gulp.dest('./build/'));
});
gulp.task('release', function () {
    return gulp.src(files)
        .pipe(uglify())
        .pipe(concat('maserUI.min.js'))
        .pipe(gulp.dest('./build/'));
});