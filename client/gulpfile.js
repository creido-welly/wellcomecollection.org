const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const webpack = require('webpack-stream');
const gulpStylelint = require('gulp-stylelint');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const webpackConfig = require('./webpack.config.js');
const eslint = require('gulp-eslint');
const eslintConfig = require('./.eslintrc.json');
const devMode = gutil.env.dev;

const sources = {
  scss: {
    manifests: [
      'scss/application.scss',
      'scss/styleguide.scss'
    ],
    all: 'scss/**/*.scss',
    distPath: '../dist/assets/css'
  },
  js: {
    entry: './js/app.js',
    distPath: '../dist/assets/js/',
    all: 'js/**/*.js'
  },
  fonts: {
    srcPath: './fonts/**/*.{woff,woff2}',
    distPath: '../dist/assets/fonts/'
  },
  images: {
    srcPath: './images/**/*.*',
    distPath: '../dist/assets/images/'
  },
  icons: {
    srcPath: './icons/**/*.*',
    distPath: '../dist/assets/icons/'
  }
};

gulp.task('fonts:copy', function() {
  gulp.src(sources.fonts.srcPath)
    .pipe(gulp.dest(sources.fonts.distPath));
});

gulp.task('images:copy', () => {
  gulp.src(sources.images.srcPath)
    .pipe(gulp.dest(sources.images.distPath));
});

gulp.task('icons:copy', () => {
  gulp.src(sources.icons.srcPath)
    .pipe(gulp.dest(sources.icons.distPath));
});

// TODO: pull out autoprefixing / sourcemaps to it's own task
gulp.task('scss:compile', () => {
  return gulp.src(sources.scss.manifests)
    .pipe(devMode ? sourcemaps.init() : gutil.noop())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .on('error', sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(devMode ? sourcemaps.write() : gutil.noop())
    .pipe(gulp.dest(sources.scss.distPath))
});

gulp.task('scss:lint', () => {
  return gulp.src(sources.scss.all)
    .pipe(gulpStylelint({
      syntax: 'scss',
      failAfterError: !devMode,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

gulp.task('js:compile', () => {
  return gulp.src(sources.js.entry)
    .pipe(webpack(webpackConfig))
    .on('error', function(err) {
      console.log(err.toString());
      // Allows the stream to continue, thus not breaking watch§
      this.emit('end');
    })
    .pipe(gulp.dest(sources.js.distPath));
});

gulp.task('js:lint', () => {
  return gulp.src(sources.js.all)
    .pipe(eslint(eslintConfig))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('watch', () => {
  gulp.watch(sources.scss.all, ['scss:compile']);
  gulp.watch(sources.js.all, ['js:compile']);
  gulp.watch(sources.fonts.srcPath, ['fonts:copy']);
  gulp.watch(sources.images.srcPath, ['images:copy']);
  gulp.watch(sources.icons.srcPath, ['icons:copy']);
});

gulp.task('js', ['js:lint', 'js:compile']);
gulp.task('scss', ['scss:lint', 'scss:compile']);
gulp.task('lint', ['scss:lint', 'js:lint']);
gulp.task('compile', ['scss:compile', 'js:compile', 'fonts:copy', 'images:copy', 'icons:copy']);
gulp.task('build', ['scss', 'js']);
gulp.task('dev', ['compile', 'watch']);
