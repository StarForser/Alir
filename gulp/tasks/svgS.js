"use strict"

module.exports = function () {
    $.gulp.task('svgS', function () {
        return $.gulp.src($.PATH_SRC + 'svg/**/*.svg')
            .pipe($.gp.svgmin({
                js2svg: {
                    pretty: true
                }
            }))
            .pipe($.gp.cheerio({
                run: function ($) {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                },
                parserOptions: { xmlMode: true }
            }))
            .pipe($.gp.replace('&gt;', '>'))
            .pipe($.gp.svgSprite({
                mode: {
                    symbol: {
                        sprite: "../sprite.svg",
                        render: {
                            scss: {
                                dest: '../../../src/styles/self/_sprite.scss',
                                template: "./src/styles/self/_sprite_template.scss"
                            }
                        }
                    }
                }
            }))
            .pipe($.gulp.dest($.PATH_BUILD +  $.account.path.IMG_DIR_NAME));
    });
}