var gulp = require('gulp')
  , gutil = require('gulp-util')
  , rimraf = require('gulp-rimraf')
  , concat = require('gulp-concat')
  , rename = require('gulp-rename')
  , minifycss = require('gulp-minify-css')
  , minifyhtml = require('gulp-minify-html')
  , processhtml = require('gulp-processhtml')
  , jshint = require('gulp-jshint')
  , streamify = require('gulp-streamify')
  , uglify = require('gulp-uglify')
  , connect = require('gulp-connect')
  , source = require('vinyl-source-stream')
  , browserify = require('browserify')
  , watchify = require('watchify')
  , gulpif = require('gulp-if')
  , runSequence = require('run-sequence')
  , paths;
  //test

var watching = false;

paths = {
  assets: 'src/assets/**/*',
  css:    'src/css/*.css',
  libs:   [
    'src/js/libs/*.js'
  ],
  js:     ['src/js/*.js', 'src/js/**/*.js'],
  entry: './src/js/main.js',
  dist:   './dist/'
};

gulp.task('clean', function () {
  return gulp.src(paths.dist, {read: false})
    .pipe(rimraf({ force: false }))
    .on('error', gutil.log);
});

gulp.task('copy', function () {
  return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.dist + 'assets'))
    .on('error', gutil.log);
});

gulp.task('copylibs', function () {
  return  gulp.src(paths.libs)
    .pipe(gulpif(!watching, uglify({outSourceMaps: false})))
    .pipe(gulp.dest(paths.dist + 'js/libs'))
    .on('error', gutil.log);
});

gulp.task('compile', function () {
  var bundler = browserify({
    cache: {}, packageCache: {}, fullPaths: true,
    entries: [paths.entry],
    debug: watching
  });

  var bundlee = function() {
    return bundler
      .bundle()
      .pipe(source('main.min.js'))
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('default'))
      .pipe(gulpif(!watching, streamify(uglify({outSourceMaps: false}))))
      .pipe(gulp.dest(paths.dist))
      .on('error', gutil.log);
  };

  if (watching) {
    bundler = watchify(bundler);
    bundler.on('update', bundlee)
  }

  return bundlee();
});

gulp.task('minifycss', function () {
  return  gulp.src(paths.css)
    .pipe(gulpif(!watching, minifycss({
      keepSpecialComments: false,
      removeEmpty: true
    })))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.dist + "css/"))
    .on('error', gutil.log);
});

gulp.task('processhtml', function() {
  return gulp.src('src/index.html')
    .pipe(processhtml('index.html'))
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('processAndminifyhtml', function() {
  return gulp.src('dist/index.html')
    .pipe(processhtml('index.html'))
    .pipe(minifyhtml())
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('html', function(){
  gulp.src('dist/*.html')
    .pipe(connect.reload())
    .on('error', gutil.log);
});

gulp.task('connect', function () {
  connect.server({
    root: ['./dist'],
    port: 9000,
    livereload: false
  });
});

gulp.task('watch', function () {
  watching = true;
  return gulp.watch(['./src/index.html', paths.css, paths.js],['rebuildSync']);
});


gulp.task('default', ['buildSync', 'connect', 'watch']);
//gulp.task('build', ['clean', 'copy', 'copylibs', 'compile', 'minifycss', 'processAndminifyhtml']);
gulp.task('build', function(){
  runSequence('clean', 'copy', 'copylibs', 'compile', 'minifycss', 'processAndminifyhtml');
});
gulp.task('buildSync', function(){
  runSequence('clean', 'copy', 'copylibs', 'compile', 'minifycss', 'processhtml');
});
gulp.task('rebuildSync', function(){
  return runSequence('compile','html');
});

