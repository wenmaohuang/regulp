// var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream')
var sass = require('gulp-sass');
const concat = require('gulp-concat')
const gulp = require( "gulp" )
const  connect = require('gulp-connect');
var cssMin = require('gulp-css');
// 在命令行使用 gulp watch 启动此任务
gulp.task('watch', function () {
    // 监听文件修改，当文件被修改则执行 html 任务
    gulp.watch('./**/(*.jsx)', gulp.series('jsx') );
    gulp.watch('./src/*.css', gulp.series('css'));
    gulp.watch('./index.html', gulp.series('html') ); // gulp4.0任务统一使用回调函数，不再支持 ['html'] 这种形式
})
gulp.task('html',function(){
    return gulp.src('./index.html')
        .pipe(gulp.dest('dist/')) // 生成静态文件
        .pipe(connect.reload());    // 刷新浏览器
})
gulp.task('jsx',function(){
    return browserify('src/main.js')
        .transform(babelify, {
            presets: ["@babel/preset-env", "@babel/preset-react"],
                // "plugins": ["@babel/plugin-syntax-class-properties"]
                plugins: ['@babel/plugin-proposal-class-properties']
        },

            )
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload())
    // gulp.src('./app/js/*.js').pipe(connect.reload());
});

gulp.task('css',function (){
    return gulp.src('./src/*.css')
        .pipe(concat('style.css'))
        // .pipe(cssMin())
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload())

})

// var gulp = require('gulp');
// gulp.task('sass', function(){
//     return gulp.src('./views/*.scss')
//         .pipe(sass())
//         // .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('dist/css'))
//         .pipe(connect.reload())
//
// });

// gulp.task('css',function(){
//     return gulp.src('./app/css/*.css').pipe(connect.reload());
// });
gulp.task('webserver', function() {
    connect.server({
        root: './dist',
        livereload: true,// 自动刷新
        port: 3000
    });
});
// 开启default任务，管理其他任务
gulp.task('default',gulp.series(gulp.parallel('webserver','watch','html','jsx','css')))
