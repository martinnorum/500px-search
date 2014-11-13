var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    browserify = require('gulp-browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    defineModule = require('gulp-define-module'),
    declare = require('gulp-declare');
    

var dest = './build';


// SASS
gulp.task('styles', function() {
    return gulp.src('src/styles/app.scss')
        .pipe(sass({
            style: 'expanded'
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(dest + '/styles'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(dest + '/styles'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

// IMAGES
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(dest + '/img'))
        .pipe(notify({
            message: 'Images task complete'
        }));
});

// HTML
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest(dest));
});

// CLEAN
gulp.task('clean', function(cb) {
    del(['build', 'dist'], cb);
});

// TEMPLATES
gulp.task('templates', function(){
  gulp.src('src/templates/*.hbs')
    .pipe(handlebars())
    .pipe(defineModule('node'))
    .pipe(gulp.dest('src/scripts/templates/'));
});

// BROWSERIFY
gulp.task('scripts', ['templates'], function() {
    return gulp.src('src/scripts/app.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(browserify({
            insertGlobals: false,
            debug: true
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest + '/scripts'))
        .pipe(notify({
            message: 'Scripts task complete'
        }))
});


// CONNECT
gulp.task('connect', function() {
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');
    var app = connect()
        .use(require('connect-livereload')({
            port: 35729
        }))
        .use(serveStatic(dest))
        .use(serveIndex(dest));

    require('http').createServer(app)
        .listen(3000)
        .on('listening', function() {
            console.log('Started connect web server on http://localhost:3000');
        });
});

//SERVER
gulp.task('serve', ['connect', 'build'], function() {
    var livereload = require('gulp-livereload');

    livereload.listen();

    // require('opn')('http://localhost:3000', 'FirefoxDeveloperEdition');

    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch(['src/scripts/**/*.js', 'src/templates/**/*.hbs'], ['scripts']);
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch([dest + '/**']).on('change', livereload.changed);
});

// DEAFULT
gulp.task('build', ['styles', 'scripts', 'images', 'html']);
gulp.task('default', ['clean'], function() {
    gulp.start('build');
});
