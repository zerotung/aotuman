var gulp = require('gulp'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    postcss = require('gulp-postcss');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify = require("babelify");

var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');

var browserSync = require('browser-sync').create()
var reload = browserSync.reload

gulp.task('test', function() {
    return console.log('This is a test!')
})

gulp.task('html', function() {

    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
})

gulp.task('css', function() {

    return gulp.src('src/styles/*.css')
        .pipe(postcss([autoprefixer, cssnext, precss]))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/static'))
})

gulp.task('sass', function() {

    return gulp.src('src/styles/*.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer, cssnext, precss]))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/static'))
})

gulp.task('img', function() {
    return gulp.src('src/imgs/*.*')
        .pipe(imagemin({
            optimizationLevel: 7,
            progressive: true,
            use: [pngquant()] //使用pngquant来压缩png图片
        }))
        .pipe(gulp.dest('dist/static'))
})

gulp.task('js', function() {

    return browserify('src/js/app.js')
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js')) // gives streaming vinyl file object
        .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
        .pipe(uglify()) // now gulp-uglify works 
        .pipe(gulp.dest('dist/static'))
        .pipe(reload({
            stream: true
        }))
})

gulp.task('build', ['sass', 'html', 'js', 'css', 'img'])

gulp.task('dev', ['js:dev', 'css:dev', 'sass:dev', 'html:dev', 'img:dev'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist" // 设置服务器的根目录为 dist 目录
        }
        // notify: false // 开启静默模式
    })
    gulp.watch('src/js/*.js', ['js:dev'])
    gulp.watch('src/styles/*.scss', ['sass:dev'])
    gulp.watch('src/styles/*.css', ['css:dev'])
    gulp.watch('src/imgs/*.(png|jpg)', ['img:dev'])
    gulp.watch('src/*.html', ['html:dev'])
})

gulp.task('html:dev', function() {

    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(reload({
            stream: true
        }))
})

gulp.task('css:dev', function() {

    return gulp.src('src/styles/*.css')
        .pipe(postcss([autoprefixer, cssnext, precss]))
        .pipe(gulp.dest('dist/static'))
        .pipe(reload({
            stream: true
        }))
})

gulp.task('sass:dev', function() {

    return gulp.src('src/styles/*.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer, cssnext, precss]))
        .pipe(gulp.dest('dist/static'))
        .pipe(reload({
            stream: true
        }))
})

gulp.task('img:dev', function() {
    return gulp.src('src/imgs/*.+(png|jpg)')
        .pipe(gulp.dest('dist/static'))
})

gulp.task('js:dev', function() {

    return browserify('src/js/app.js')
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js')) // gives streaming vinyl file object
        .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
        .pipe(gulp.dest('dist/static'))
        .pipe(reload({
            stream: true
        }))
})