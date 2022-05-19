const gulp = require("gulp");

// Dev FrontEnd
const browserSync = require("browser-sync").create();
const nunjucksRender = require("gulp-nunjucks-render");
const beautify = require("gulp-beautify");
const dartSass = require("sass");
const gulpSass = require("gulp-sass");
const sass = gulpSass(dartSass);
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const webpack = require("webpack-stream");
const imagemin = require("gulp-imagemin");
const changed = require("gulp-changed");

// Build
const htmlMin = require("gulp-htmlmin");
const del = require("del");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");

gulp.task("browserSync", function () {
  browserSync.init({
    server: "public/",
  });
  gulp.watch(["src/html/**/*.njk"]).on("change", gulp.parallel("nunjucks"));
  gulp.watch(["src/scss/**/*.scss"]).on("change", gulp.parallel("sass"));
  gulp.watch(["src/js/**/*.js"]).on("change", gulp.parallel("webpack"));
});

gulp.task("nunjucks", function () {
  return gulp
    .src("src/html/pages/*.njk")
    .pipe(
      nunjucksRender({
        path: ["src/html"],
      })
    )
    .pipe(beautify.html({ indent_size: 4, preserve_newlines: false }))
    .pipe(gulp.dest("public/"))
    .pipe(browserSync.stream());
});

gulp.task("sass", function () {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("public/"))
    .pipe(browserSync.stream());
});

gulp.task("webpack", function () {
  return gulp
    .src("src/js/**/*.js")
    .pipe(
      webpack({
        mode: "development",
      })
    )
    .pipe(gulp.dest("public/"))
    .pipe(browserSync.stream());
});

gulp.task("imgLoad", function () {
  return gulp
    .src("src/img/**/*.{jpg,jpeg,png,gif}")
    .pipe(changed("public/img/"))
    .pipe(imagemin())
    .pipe(gulp.dest("public/img/"));
});

gulp.task("imgLoadBuild", function () {
  return gulp
    .src("src/img/**/*.{jpg,jpeg,png,gif}")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/public/img/"));
});

gulp.task("clean", function () {
  return del(["public"]);
});

gulp.task("cleanBuild", function () {
  return del(["dist/", "public"]);
});

gulp.task("htmlBuild", function () {
  return gulp
    .src("public/*.html")
    .pipe(
      htmlMin({
        sortAttributes: true,
        sortClassName: true,
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest("dist/public"));
});

gulp.task("cssBuild", function () {
  return gulp
    .src("public/main.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("dist/public"));
});

gulp.task("jsBuild", function () {
  return gulp
    .src("src/js/**/*.js")
    .pipe(
      webpack({
        mode: "production",
      })
    )
    .pipe(gulp.dest("dist/public"));
});

gulp.task("controllersBuild", function () {
  return gulp
    .src(["controllers/*.js"])
    .pipe(uglify())
    .pipe(gulp.dest("dist/controllers/"));
});
gulp.task("middlewareBuild", function () {
  return gulp
    .src(["middleware/*.js"])
    .pipe(uglify())
    .pipe(gulp.dest("dist/middleware/"));
});

gulp.task("modelsBuild", function () {
  return gulp
    .src(["models/*.js"])
    .pipe(uglify())
    .pipe(gulp.dest("dist/models/"));
});
gulp.task("routesBuild", function () {
  return gulp
    .src(["routes/*.js"])
    .pipe(uglify())
    .pipe(gulp.dest("dist/routes/"));
});

gulp.task("appjsBuild", function () {
  return gulp.src(["app.js"]).pipe(uglify()).pipe(gulp.dest("dist/"));
});

gulp.task(
  "serverBuild",
  gulp.parallel(
    "controllersBuild",
    "middlewareBuild",
    "modelsBuild",
    "routesBuild",
    "appjsBuild"
  )
);

gulp.task(
  "build",
  gulp.series(
    "cleanBuild",
    gulp.parallel("nunjucks", "sass"),
    gulp.parallel("htmlBuild", "cssBuild", "imgLoadBuild", "jsBuild"),
    "serverBuild",
    "clean"
  )
);

gulp.task(
  "default",
  gulp.series("imgLoad", "nunjucks", "sass", "webpack", "browserSync")
);
