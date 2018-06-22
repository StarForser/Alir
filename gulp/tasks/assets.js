"use strict"

module.exports = function () {

    $.gulp.task('assets', function () {
        return $.gulp.src($.PATH_SRC + '/assets/**')
            .pipe($.gp.cached('assets'))
            .pipe($.gp.newer($.PATH_BUILD))
            .pipe($.gp.debug({ title: "assets" }))
            .pipe($.gulp.dest($.PATH_BUILD))
    });
}