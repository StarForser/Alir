"use strict"

module.exports = function () {
    $.gulp.task('clear', function () {
        return $.gulp.src('./build/*', { read: false })
            .pipe($.gp.clean())
    })
}
 