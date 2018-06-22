"use strict"

module.exports = function () {
    $.gulp.task('manifest', () => {
       return $.gulp.src([$.PATH_BUILD + 'css/*.css', $.PATH_BUILD + 'js/*.js'], {base: $.PATH_BUILD})
        .pipe($.gp.rev())
        .pipe($.gulp.dest($.PATH_BUILD))
        .pipe($.gp.rev.manifest({
            merge: true
        }))
        .pipe($.gulp.dest($.PATH_BUILD + $.PATH_MANIFEST))
    });
}