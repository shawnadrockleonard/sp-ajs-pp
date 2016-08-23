'use strict';

const gulp = require('gulp');
const tslint = require('gulp-tslint');
const gitignore = require('gitignore-to-glob')();
var dest = require('gulp-dest');
var del = require('del');

var paths = {
    app: ['apps/**/*.js', 'apps/**/*.css', "apps/**/*.html"],
    libs: [
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/es6-shim/es6-shim.map',
        'node_modules/zone.js/dist/zone.js*',
        'node_modules/reflect-metadata/Reflect.js*',
        'node_modules/systemjs/dist/system.src.js*'
    ],
    angular: [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router-deprecated',
        '@angular/testing',
        '@angular/upgrade'
    ],
    css: [
        'node_modules/bootstrap/dist/css/bootstrap.css'
    ]
};

gitignore.push('**/*.ts');



gulp.task('default', () => {
    gulp.start('clean');
});

// clean all the generated typescript files
gulp.task('clean', function () {
    return del(['scripts/apps/**/*', 'scripts/libs/**/*']);
});
