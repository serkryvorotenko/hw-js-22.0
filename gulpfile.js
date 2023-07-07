const gulp = require('gulp');
const dartSass = require('sass');
const gulpSass = require('gulp-sass');
const concatCss = require('gulp-concat-css');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();


const sass = gulpSass(dartSass);

function buildStyles() {
    return gulp.src('./src/style/**/*.scss')
        .pipe(sass())
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest('./dist/css'));
}

function watchStyles() {
    return gulp.watch('./src/style/**/*.scss', buildStyles)
}

function buildJS() {
    return gulp.src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
}

function watchJS() {
    return gulp.watch('./src/js/**/*.js', buildJS)
}

function buildProject() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist'))

}

function removeDist() {
    return gulp.src('./dist', {allowEmpty: true})
        .pipe(clean())
}

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });


    gulp.watch("./src/*.html").on('change', function () {
        buildProject()
        browserSync.reload()
    });

    gulp.watch("./src/style/**/*.scss").on('change', function () {
        buildStyles();
        browserSync.reload();
    });

    gulp.watch("./src/js/**/*.js").on('change', function () {
        buildJS();
        browserSync.reload()
    });


});

exports.buildStyles = buildStyles;
exports.watchStyles = watchStyles;
exports.buildJS = buildJS;
exports.watchJS = watchJS;
exports.removeDist = removeDist;
exports.buildProject = gulp.series(removeDist, buildProject, gulp.parallel(buildStyles, buildJS));


