"use strict"

module.exports = function () {
    $.gulp.task('server', function () {
        $.browserSync.init({
            open: false,
            server: './build'
        });
        $.browserSync.watch('build').on('change', $.browserSync.reload)
    })
}