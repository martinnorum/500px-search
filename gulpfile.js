var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');


// SASS
gulp.task('styles', function() {
    return gulp.src('src/styles/app.scss')
        .pipe(sass({
            style: 'expanded'
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

// JAVASCRIPT
gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(notify({
            message: 'Scripts task complete'
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
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(notify({
            message: 'Images task complete'
        }));
});

// CLEAN
gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
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
        .use(serveStatic('dist'))
        .use(serveIndex('dist'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function() {
            console.log('Started connect web server on http://localhost:9000');
        });
});

//SERVER
gulp.task('serve', ['connect', 'styles'], function() {
    var livereload = require('gulp-livereload');

    livereload.listen();

    // require('opn')('http://localhost:9000', 'firefox');

    // Watch .scss files
    gulp.watch('src/styles/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('src/images/**/*', ['images']);

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);
    // watch for changes
    // gulp.watch([
    //     'app/*.html',
    //     '.tmp/styles/**/*.css',
    //     'app/scripts/**/*.js',
    //     'app/images/**/*'
    // ]).on('change', livereload.changed);

    // gulp.watch('app/scss/**/*.scss', ['sass']);
    // gulp.watch('bower.json', ['wiredep']);
});

// DEAFULT
gulp.task('build', ['styles', 'scripts', 'images']);
gulp.task('default', ['clean'], function() {
    gulp.start('build');
});
