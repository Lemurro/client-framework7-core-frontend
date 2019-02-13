var gulp     = require('gulp');           // Сам Gulp JS
var cleanCSS = require('gulp-clean-css'); // Минификация CSS
var concat   = require('gulp-concat');    // Склейка файлов
var rename   = require('gulp-rename');    // Переименование файлов
var uglify   = require('gulp-uglify');    // Минификация JS

// WATCHER

function watcherCSS() {
    return gulp.watch('src/css/*.css', gulp.series(coreCSS, coreMinCSS));
}

function watcherJS() {
    return gulp.watch('src/js/**/*.js', gulp.series(coreJS, coreMinJS));
}

// CSS
function coreCSS() {
    return gulp.src('src/css/*.css')
        .pipe(concat('core.css'))
        .pipe(gulp.dest('dist'));
}

function coreMinCSS() {
    return gulp.src('dist/core.css')
        .pipe(cleanCSS())
        .pipe(rename('core.min.css'))
        .pipe(gulp.dest('dist'));
}

// JS
function coreJS() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('core.js'))
        .pipe(gulp.dest('dist'));
}

function coreMinJS() {
    return gulp.src('dist/core.js')
        .pipe(uglify())
        .pipe(rename('core.min.js'))
        .pipe(gulp.dest('dist'));
}

// TASKS

gulp.task('build', gulp.parallel(
    gulp.series(coreCSS, coreMinCSS),
    gulp.series(coreJS, coreMinJS)
));

gulp.task('watcher', gulp.series('build', gulp.parallel(watcherCSS, watcherJS)));