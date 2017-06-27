var gulp = require('gulp');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', function () {
    var tsProject = ts.createProject('tsconfig1.json');

    gulp.src([
        "vm/todo.ts"
    ]).pipe(tsProject())
        .pipe(gulp.dest("dist/js"))
        .pipe(uglify({ mangle: false }))
        .pipe(rename("todo.min.js"))
        .pipe(gulp.dest("dist/js"));
});