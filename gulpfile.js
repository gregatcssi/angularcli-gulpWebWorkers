var gulp = require('gulp');
var typescript = require('gulp-tsc');
var concat = require('gulp-concat');
var template = require('gulp-template');
var uglify = require('gulp-uglify');    
inject = require('gulp-inject-string');

gulp.task('default', () =>
    gulp.src('src/Workers/*.ts')
        .pipe(typescript())
        .pipe(uglify())
        .pipe(inject.prepend('//THIS is a Test Created:'+Date()+'\n') )
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('src/Workers'))
);