"use strict"

module.exports = function () {
    $.gulp.task('js', () => {
        return $.gulp.src([
            $.PATH_SRC +'/js/*.js'
        ])
            .pipe($.gp.plumber({
                errorHandler: $.gp.notify.onError({
                    title: "JS"
                })
            }))
            .pipe($.gp.if($.isDevelopment, $.gp.sourcemaps.init()))
            .pipe($.gp.concat('all.js'))
            .pipe($.gp.if(!$.isDevelopment, $.uglifyES()))
            .pipe($.gp.babel())
            .pipe($.gp.if($.isDevelopment, $.gp.sourcemaps.write()))
            .pipe($.gp.rename('build.js'))
            .pipe($.gulp.dest($.PATH_BUILD + $.account.path.JS_DIR_NAME))
    });
}