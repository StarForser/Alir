"use strict"

module.exports = function () {
    
    $.gulp.task('pug', () => {
        var manifest = $.gulp.src('./' + $.PATH_BUILD + $.PATH_MANIFEST + "rev-manifest.json", { allowEmpty: true });
        return $.gulp.src($.PATH_SRC +'/pug/pages/*.pug')
            .pipe($.gp.plumber({
                errorHandler: $.gp.notify.onError({
                    title: "Pug"
                })
            }))
            .pipe($.gp.pug({
              pretty: true
            }))
            .pipe($.gp.if(!$.isDevelopment, $.gp.revReplace({
                manifest: manifest
            })))
            .pipe($.gulp.dest($.PATH_BUILD))
    });
}