'use strict';

global.$ = {
    isDevelopment: !process.env.NODE_ENV || process.env.NODE_ENV == "development",
    path: {
        task: require("./gulp/paths/tasks.js")
    },
    account:  require("./gulp/paths/account.js"),
    gulp: require("gulp"),
    jftp: require("jsftp"),
    fs: require("fs"),
    vfs: require("vinyl-ftp"),
    fullpath: require("path"),
    uglifyES: require('gulp-uglify-es').default,
    gp: require("gulp-load-plugins")(  
    {
        rename: {
            'gulp-group-css-media-queries': 'gcmq',
        }
    }),
    browserSync: require('browser-sync').create(),
    PATH_BUILD: "build/",
    PATH_SRC: "src/",
    PATH_MANIFEST: "manifest/"

};








const isDevelopment = 


$.path.task.forEach(function(taskPath){
    require(taskPath)();
})

$.gulp.task('dev', $.gulp.series(
    ['build',
    'pug'],
    $.gulp.parallel(
        'watch', 
        'server')
    )
);
$.gulp.task('deploy', $.gulp.series(
    'build',
    'manifest',
    'pug',
    )
);



















