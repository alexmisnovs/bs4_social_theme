"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const del = require("del");
const browserSync = require("browser-sync").create();

// delete css, js and fonts folders
function clean() {
  return del(["./docs/assets/css", "./docs/assets/js", "./docs/assets/fonts"]);
}

// compile sass and inject into browser

function styles() {
  return gulp
    .src(["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"])
    .pipe(sass())
    .pipe(gulp.dest("./docs/assets/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp
    .src([
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/popper.js/dist/umd/popper.min.js"
    ])
    .pipe(gulp.dest("docs/assets/js"))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./docs"
    }
  });
  gulp.watch(
    ["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"],
    styles
  );
  gulp.watch("./docs/*.html").on("change", browserSync.reload);
}

// move font awesome to dist

function fonts() {
  return gulp
    .src("node_modules/font-awesome/fonts/*")
    .pipe(gulp.dest("./docs/assets/fonts"));
}

function fa() {
  return gulp
    .src("node_modules/font-awesome/css/font-awesome.min.css")
    .pipe(gulp.dest("./docs/assets/css"));
}

// set the default task
const build = gulp.series(
  clean,
  gulp.parallel(fa, fonts, styles, scripts),
  watch
);

exports.fonts = fonts;
exports.clean = clean;
exports.fa = fa;
exports.style = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.default = build;
