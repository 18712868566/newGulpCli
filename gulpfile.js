const source = require('vinyl-source-stream'); // 在gulp 中直接使用npm包  
const browserify = require('browserify'); // 转义 es6789更高级语法 export、import、class

// demo
const gulp = require('gulp'); // gulp 
const {
    series,
    parallel,
    src,
    dest,
    watch
} = gulp; //  创建一个文件拷贝任务,文件拷贝需要使用到gulp提供的方法
const concat = require('gulp-concat'); // 文件合并
const cssMinify = require('gulp-css-minify'); // css文件压缩
const autoprefixer = require('gulp-autoprefixer'); // css自动补全前缀
const del = require('del'); //清空文件夹，避免文件冗余

const babel = require('gulp-babel'); // es6转es5
const uglify = require('gulp-uglify'); //压缩JS

const imagemin = require('gulp-imagemin'); // 压缩图片
const cache = require('gulp-cache'); //基于临时文件缓存的代理任务
const pngquant = require('imagemin-pngquant'); // 控制台打印前后变化
const tiny = require('gulp-tinypng-nokey'); // tinypng 模拟用户上传和下载的行为，来得到压缩图片，突破使用官网api每月500张限制

const browserSync = require('browser-sync').create(); // 浏览器运行
const { createProxyMiddleware } = require('http-proxy-middleware');
// const changed = require('gulp-changed'); //监听文件发生改变

// font字体压缩
var fontSpider = require('gulp-font-spider'); // 字体压缩


/*
    清空目标目录
*/
function clean() {
    return del(['dist', 'dest']);
}
/*
 *   ==================================css
 *   处理css
 */
function css() {
    return gulp.src('./app/css/**/*.css') // 读取css 文件路径
        .pipe(concat('build.min.css')) //合并匹配到的指定类型文件并命名为 "build.min.css"
        .pipe(autoprefixer({
            cascade: true // 添加前缀前是否压缩 默认值 true
        }))
        .pipe(gulp.dest('./dist/css')) // 输出文件路径
        .pipe(cssMinify()) // css 文件压缩
        .pipe(gulp.dest('./dist/css')) //写入dist文件夹

}

/*
 *   ==================================js
 *   处理js
 */
function js() {
    return gulp.src(['./app/js/**/*.js']) //不需要读取文件，因为 browserify 可以。
        .pipe(babel()) //es转es5
        .pipe(uglify({
            compress: {
                drop_console: true, // 过滤 console
                drop_debugger: true // 过滤 debugger
            },
            output: {
                beautify: true, //开启美化
                comments: 'some' // 保留部分注释
            }
        }))
        // .pipe(concat('build.js')) //合并匹配到的指定类型文件并命名为 "build.min.js"
        .pipe(gulp.dest('./dest/js')) // 输出文件路径

}

function copyDestJs() {
    return gulp.src(['./dest/js/**/*.js'])
        .pipe(gulp.dest('./dist/js')) // 输出文件路径
}
/*
 *   ==================================img
 *   处理图片
 */
function minimg() {
    return gulp.src('./app/images/**/*.{png,jpg,gif,svg}')
        .pipe(imagemin({
            svgoPlugins: [{ removeViewBox: false }], //不要移除svg的viewbox属性
            optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(cache(tiny()))
        .pipe(gulp.dest('./dist/images/'));
}


/*
 *   ==================================font
 *   处理字体
 */
function fontMinspider() {
    return gulp.src('./app/*.html')
        .pipe(fontSpider())
}

function copyFont() {
    return gulp.src('./app/font/*')
        .pipe(gulp.dest('./dist/font/'))
}

function copyBowerFile() {
    return gulp.src(['./app/bower_components/**/**'])
        .pipe(gulp.dest('./dist/bower_components'));
}

/*
 *   ==================================静态资源
 *   copy静态资源
 */
function copyAudio() {
    return gulp.src(['./app/audio/**/*.*'])
        .pipe(gulp.dest('./dist/audio'));
}

function copyVideo() {
    return gulp.src(['./app/video/**/*.*'])
        .pipe(gulp.dest('./dist/video'));
}

/*
 *   ==================================HTML压缩
 *  html
 */
function setHtmlmin() {
    const options = {
        removeComments: false, //清除HTML注释
        collapseWhitespace: false, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    return gulp.src(['./app/*.html'])
        .pipe(gulp.dest('./dist/'));
}

/*
 *   ==================================server
 *   本地开发
 */

const options = {
    target: 'http://shinsangokushi.com', // 目标服务器 host
    changeOrigin: false, // 默认false，是否需要改变原始主机头为目标URL
    pathRewrite: {
        // '^/api/old-path': '/api/new-path', // 重写请求，比如我们源访问的是api/old-path，那么请求会被解析为/api/new-path
        // '^/api/remove/path': '/path' // 同上

        '^/pray/get-user-info.html': '/api/gitUserInfo', // 重写请求，比如我们源访问的是/pray/get-user-info.html，那么请求会被解析为/api/gitUserInfo
    },
    router: {
        // 如果请求主机 == 'dev.localhost:3000',
        // 重写目标服务器 'http://shinsangokushi.com' 为 'http://localhost:8000'
        // 'http://shinsangokushi.com': 'http://localhost:8000'
    },
    logLevel: 'debug'
}

const jsonPlaceholderProxy = createProxyMiddleware('/first-year', {
    target: 'https://grayraven.jp', // 目标服务器 host
    changeOrigin: true, // 默认false，是否需要改变原始主机头为目标URL
    logLevel: 'debug',
});


function server() {
    let proxy = createProxyMiddleware(options);

    browserSync.init({
        server: {
            baseDir: './app',
            port: 8000,
            middleware: [jsonPlaceholderProxy],
        },
        ghostMode: false, //关掉多设备同步
    });
    gulp.watch('./app').on('change', browserSync.reload);
}


// 导出 处理css的任务 ,导出后才能 gulp.css 调用  区别于 gulp.task方式
exports.clean = clean;
exports.css = css;
exports.js = js;
exports.copyDestJs = copyDestJs;

exports.minimg = minimg;
exports.fontMinspider = fontMinspider;
exports.copyFont = copyFont;
exports.server = server;
exports.copyAudio = copyAudio;
exports.copyVideo = copyVideo;
exports.copyBowerFile = copyBowerFile;
exports.setHtmlmin = setHtmlmin;



// 单独处理js
exports.buildJs = series(clean, js);

exports.default = series(
    clean,
    parallel(
        css,
        // js,
        series(js, copyDestJs),
        series(fontMinspider, copyFont)
    ),
    minimg,
    copyBowerFile,
    copyAudio,
    copyVideo,
    setHtmlmin
);