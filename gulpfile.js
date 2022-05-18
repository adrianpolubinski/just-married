const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const webpack = require("webpack-stream");
const dartSass = require("sass");
const gulpSass = require("gulp-sass");
const sass = gulpSass(dartSass);
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const changed = require("gulp-changed");
const htmlMin = require("gulp-htmlmin");
const del = require("del");

const config = {
  dist: "dist/",
  src: "src/",
  cssin: "src/main.css",
  cssout: "dist/css",
  jsin: "src/main.js",
  jsout: "dist/js/",
  imgin: "src/img/**/*.{jpg,jpeg,png,gif}",
  imgout: "dist/img/",
  htmlin: "src/*.html",
  htmlout: "dist/",
  scssin: "src/scss/**/*.scss",
  scssout: "src/",
  webpackin: "src/js/app.js",
  webpackout: "src/",
  webpackjsin: "src/js/**/*.js",
};

gulp.task("browserSync", function () {
  browserSync.init({
    server: config.src,
  });
  gulp.watch([config.htmlin]).on("change", browserSync.reload);
  gulp.watch([config.scssin]).on("change", gulp.parallel("sass"));
  gulp.watch([config.webpackjsin]).on("change", gulp.parallel("webpack"));
});

gulp.task("webpack", function () {
  return gulp
    .src(config.webpackin)
    .pipe(
      webpack({
        mode: "development",
      })
    )
    .pipe(gulp.dest(config.webpackout))
    .pipe(browserSync.stream());
});

gulp.task("sass", function () {
  return gulp
    .src(config.scssin)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.scssout))
    .pipe(browserSync.stream());
});

gulp.task("css", function () {
  return gulp.src(config.cssin).pipe(cleanCSS()).pipe(gulp.dest(config.cssout));
});

gulp.task("js", function () {
  return gulp.src(config.jsin).pipe(uglify()).pipe(gulp.dest(config.jsout));
});

gulp.task("img", function () {
  return gulp
    .src(config.imgin)
    .pipe(changed(config.imgout))
    .pipe(imagemin())
    .pipe(gulp.dest(config.imgout));
});

gulp.task("html", function () {
  return gulp
    .src(config.htmlin)
    .pipe(
      htmlMin({
        sortAttributes: true,
        sortClassName: true,
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest(config.htmlout));
});

gulp.task("clean", function () {
  return del([config.dist]);
});

gulp.task(
  "build",
  gulp.series("clean", gulp.parallel("html", "css", "img", "js"))
);

gulp.task("default", gulp.series("sass", "webpack", "browserSync"));
