var gulp = require('gulp');
var typescript = require('gulp-tsc');
var concat = require('gulp-concat');
var template = require('gulp-template');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject-string');
var tap = require('gulp-tap');
var insert = require('gulp-insert');
var path = require('path');
var clean = require('gulp-clean');


gulp.task('updateWorker',['clean'], () =>{
   gulp.src('src/Workers/*.ts')
        .pipe(typescript())
        .pipe(uglify())
        .pipe(insert.transform(function (contents, file) {
            var comment = path.basename(file.path).substring(0, (path.basename(file.path).length - 3)) + "={js:`";
            return comment + contents;
        }))
        .pipe(inject.prepend("public "))
        .pipe(inject.append("`};"))
        .pipe(concat('workers.service.ts'))
        .pipe(inject.prepend(`import { Injectable } from '@angular/core'; @Injectable() export class WorkersService {  constructor() { }`))
        .pipe(inject.append('};'))
        .pipe(gulp.dest('src/app/services'))
}
);
gulp.task('clean',()=>{
    return gulp.src('src/app/services/workers.service.ts')
    .pipe(clean());
});
