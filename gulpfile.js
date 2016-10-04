var gulp 	= require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    rimraf = require('rimraf'),
    nunjucks = require('gulp-nunjucks-html');
    data = require('gulp-data');
    pathname = require('path'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;
  
var path = {
    build: { //куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/images/',
        fonts: 'build/fonts/',
        ui: 'build/ui'
    },
    src: { //откуда брать исходники
    	html: 'src/pages/*.html',
        templates: 'src/templates',
        js: 'src/js/main.js',
        style: 'src/style/main.less',
        img: 'src/images/*.*',
        fonts: 'src/fonts/*.*',
        ui: 'src/ui/**/*.*'
    },
    watch: { //за изменением каких файлов мы хотим наблюдать
    	jhtml: 'src/pages/*.html',
        blocks: 'src/blocks/**/*.html',
        templates: 'src/templates',
        html: 'src/*.html',
        js: 'src/js/*.js',
        style: 'src/blocks/**/*.less',
        img: 'src/images/*.*',
        fonts: 'src/fonts/*.*',
        ui: 'src/ui/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

gulp.task('html', () => {
    return gulp.src(path.src.html)
        // .pipe(data(function(file) {
        //   return require(path.src.json + pathname.basename(file.path, '.html') + '.json');
        // }))
        .pipe(nunjucks({
            searchPaths: [path.src.templates]
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js', function () {
    gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('ui', function () {
    gulp.src(path.src.ui)
        .pipe(gulp.dest(path.build.ui))
        .pipe(reload({stream: true}));
});

gulp.task('fonts', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
	'html',
    'js',
    'style',
    'fonts',
    'image',
    'ui'
]);

gulp.task('watch', function(){
	watch([path.watch.jhtml, path.watch.html, path.watch.blocks, path.watch.templates], function(event, cb) {
        gulp.start('html');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image');
    });
    watch([path.watch.ui], function(event, cb) {
        gulp.start('ui');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);