


const gulp = require( "gulp" )
const    connect = require('gulp-connect');

// 在命令行使用 gulp watch 启动此任务
gulp.task('watch', function () {
    // 监听文件修改，当文件被修改则执行 html 任务
    gulp.watch('./app/js/*.js', gulp.series('js') );
    gulp.watch('./app/css/*.css', gulp.series('css'));
    gulp.watch('./app/html/index.html', gulp.series('html') ); // gulp4.0任务统一使用回调函数，不再支持 ['html'] 这种形式
})

gulp.task('html',function(){
    return gulp.src('./app/html/*.html')
        .pipe(gulp.dest('dist/html')) // 生成静态文件
        .pipe(connect.reload());    // 刷新浏览器
})
gulp.task('js',function(){
    return gulp.src('./app/js/*.js').pipe(connect.reload());
});
gulp.task('css',function(){
    return gulp.src('./app/css/*.css').pipe(connect.reload());
});

gulp.task('webserver', function() {
    connect.server({
        root: './app/',
        livereload: true,// 自动刷新
        port: 2333
    });
});

// 开启default任务，管理其他任务
gulp.task('default',gulp.series(gulp.parallel('webserver','watch','html')))