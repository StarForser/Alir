"use strict"

module.exports = function () {
    $.gulp.task('style', function () {
        return $.gulp.src($.PATH_SRC +'styles/main.scss')
            .pipe($.gp.plumber({
                errorHandler: $.gp.notify.onError({
                    title: "Style"
                })
            }))
            .pipe($.gp.inject($.gulp.src([$.PATH_SRC +'styles/block/**/*.scss'], {read: false}), {
                starttag: '/* inject:imports */',
                endtag: '/* endinject */',
                transform: function (filepath) {
                    return '@import ".' + filepath + '";';
                }
            }))
            .pipe($.gp.if($.isDevelopment, $.gp.sourcemaps.init()))
            .pipe($.gp.sass())
            .pipe($.gp.autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe($.gp.gcmq({
                log: true
            }))
            .pipe($.gp.if($.isDevelopment, $.gp.sourcemaps.write()))
            .pipe($.gp.if(!$.isDevelopment, $.gp.csso()))
            .pipe($.gp.rename('build.css'))
            .pipe($.gulp.dest($.PATH_BUILD + $.account.path.CSS_DIR_NAME))

    })
    
}