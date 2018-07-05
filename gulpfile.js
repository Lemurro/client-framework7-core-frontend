var gulp     = require('gulp');           // Сам Gulp JS
var cleanCSS = require('gulp-clean-css'); // Минификация CSS
var concat   = require('gulp-concat');    // Склейка файлов
var rename   = require('gulp-rename');    // Переименование файлов
var uglify   = require('gulp-uglify');    // Минификация JS

gulp.task('default', ['css', 'js'], function () {
    gulp.watch('src/css/*.css', ['css']);
    gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('build', ['css', 'js']);

gulp.task('css', function () {
    gulp.src('src/css/*.css')
        .pipe(concat('core.css'))
        .pipe(gulp.dest('dist'));

    gulp.src('src/css/*.css')
        .pipe(concat('core.css'))
        .pipe(cleanCSS())
        .pipe(rename('core.min.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
    gulp.src('src/js/**/*.js')
        .pipe(concat('core.js'))
        .pipe(gulp.dest('dist'));

    gulp.src('src/js/**/*.js')
        .pipe(concat('core.js'))
        .pipe(uglify())
        .pipe(rename('core.min.js'))
        .pipe(gulp.dest('dist'));
});