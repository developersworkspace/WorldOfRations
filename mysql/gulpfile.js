var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp
        .src('./../dist/mysql', { read: false })
        .pipe(clean({force: true}));
});

gulp.task('build1', ['clean'], function () {
    return gulp
        .src('./Dockerfile')
        .pipe(gulp.dest('./../dist/mysql'));
});

gulp.task('build2', ['build1'], function () {
    return gulp
        .src('./scripts/**')
        .pipe(gulp.dest('./../dist/mysql/scripts'));
});

gulp.task('build', ['build2'], function () {
    return gulp
        .src('./scripts/**')
        .pipe(gulp.dest('./../dist/mysql/scripts'));
});