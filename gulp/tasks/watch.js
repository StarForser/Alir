"use strict"

module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch('./src/styles/**/*.*', $.gulp.series('style'))
        $.gulp.watch('./src/pug/**/*.pug', $.gulp.series('pug'))
        $.gulp.watch('./src/assets/**/*.*', $.gulp.series('assets')).on('unlink', function(filepath){
            delete $.gp.cached.caches.assets[$.fullpath.resolve(filepath)]
        })
        
        $.gulp.watch('./src/js/**/*.*', $.gulp.series('js'))
    })
}