"use strict"


module.exports = function () {

    var conn = $.vfs.create({
        host:     $.account.login.HOST,
        user:     $.account.login.USER,
        password: $.account.login.PASSWORD,
        parallel: 2,
        //log:      $.gp.util.log Найти замену gulp-util
    });

    function getFilesList() {
        return JSON.parse($.fs.readFileSync($.PATH_BUILD + $.PATH_MANIFEST + '/rev-manifest.json'));
    }

    $.gulp.task('deploy:download-revision', function() {
        return conn.src(['build/manifest/manifest/rev-manifest.json'], { cwd: $.account.path.INIT_DIR + $.PATH_MANIFEST + '/rev-manifest.json', base: $.account.path.INIT_DIR + $.PATH_MANIFEST + '/rev-manifest.json', buffer: false })
            .pipe($.gulp.dest('.', { base: '/local' }));
    });

    $.gulp.task('upload', function () {
        var files = getFilesList(); 
        const globs = [
            $.PATH_BUILD + files['css/build.css'],
            $.PATH_BUILD + files['js/build.js'],
            $.PATH_BUILD + $.account.path.IMG_DIR_NAME + "/**",
            $.PATH_BUILD + $.PATH_MANIFEST + "/**",
        ];
        return $.gulp.src( globs, { base: $.PATH_BUILD, buffer: false } )
            .pipe( conn.dest($.account.path.INIT_DIR));
    })
}


        //var ftp = new $.jftp($.account.login);

        //Проверка на существовавние папки в которую будет копироваться файл с FTP
        // if (!$.fs.existsSync("./local")) {
        //     $.fs.mkdirSync('./local')
        // }
        // ftp.get($.account.path.init + 'index.php', 'local/index.php', function (hadErr) {
        //     if (hadErr)
        //         $.gp.util.log("File error")
        //     else
        //         $.gp.util.log($.gp.util.colors.bgGreen('File copied successfully!'));
        //     ftp.put(buffer, $.account.path.CSS_PATH, function(hadError) {
        //         if (!hadError)
        //           console.log("File transferred successfully!");
        //       });
        //     ftp.raw("quit", function (err, data) {
        //         if (err) return console.error(err);
        //         $.gp.util.log("---Bye!---");

        //     });
        // });