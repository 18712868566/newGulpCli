const gulp = require('gulp'); // gulp 
const { series, parallel, src, dest, watch } = gulp; //  创建一个文件拷贝任务,文件拷贝需要使用到gulp提供的方法
const concat = require('gulp-concat'); // 文件合并
const cssMinify = require('gulp-css-minify') // css文件压缩
const autoprefixer = require('gulp-autoprefixer') // css自动补全前缀
const del = require('del'); //清空文件夹，避免文件冗余



function clean(cb) {
    del(['dist']);
    cb();
}

function css(cb) {
    gulp.src('./app/css/**/*.css') // 读取css 文件路径
        .pipe(concat('build.min.css')) //合并匹配到的指定类型文件并命名为 "build.min.css"
        .pipe(autoprefixer({
            cascade: true // 添加前缀前是否压缩 默认值 true
        }))
        .pipe(gulp.dest('./dist/css')) // 输出文件路径
        .pipe(cssMinify()) // css 文件压缩
        .pipe(gulp.dest('./dist/css')); //写入dist文件夹
    cb();
}

function js(cb) {
    gulp.src('./app/js/**/*.js') // 读取js 文件路径
        .pipe(concat('build.min.js')) //合并匹配到的指定类型文件并命名为 "build.min.js"
        .pipe(gulp.dest('./dist/js')) // 输出文件路径
    cb();
}


// 导出 处理css的任务 ,导出后才能 gulp.css 调用  区别于 gulp.task方式
exports.css = css;
exports.js = js;

exports.default = series(clean, css, js);