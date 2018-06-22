"use strict"

module.exports = function () {
    $.gulp.task('build', $.gulp.series('clear', $.gulp.parallel('style','js', 'svgS','assets')))
}