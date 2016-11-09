var gulp = require('gulp');
var typescript = require('gulp-tsc');
var concat = require('gulp-concat');
var template = require('gulp-template');
var uglify = require('gulp-uglify');    
var inject = require('gulp-inject-string');
var tap = require('gulp-tap');
var insert = require('gulp-insert');
var path = require('path');
gulp.task('default', () =>
    gulp.src('src/Workers/*.ts')
        .pipe(typescript())
        .pipe(uglify())
        
        .pipe(insert.transform(function(contents, file) {
            var comment = path.basename(file.path).substring(0,(path.basename(file.path).length-3))+"={js:`";
            return comment + contents;
        }))
        .pipe(inject.prepend("Worker."))
        
        .pipe(inject.append("`};"))
        .pipe(concat('all.min.js'))
        .pipe(inject.prepend('var Worker;'))
        .pipe(gulp.dest('src/Workers'))
);