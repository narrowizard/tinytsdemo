var gulp = require('gulp');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watch = require("gulp-watch");

gulp.task('default', function () {
    watch("vm/todo.ts", {}, function () {
        var tsProject = ts.createProject('tsconfig1.json');

        gulp.src([
            "vm/todo.ts"
        ]).pipe(tsProject())
            .pipe(gulp.dest("dist/js"))
            .pipe(uglify({ mangle: false }))
            .pipe(rename("todo.min.js"))
            .pipe(gulp.dest("dist/js"));
    });

});