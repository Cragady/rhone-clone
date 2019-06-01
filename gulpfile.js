const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin');

gulp.task('message', function(done){
    console.log('Task initiated :D');
    done();
});

gulp.task('copyFiles', function(done){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
    gulp.src('README.md')
        .pipe(gulp.dest('dist'));
    gulp.src('orig-css/reset.css')
        .pipe(gulp.dest('dist/css'));
    done(); 
});

gulp.task('imageMin', function(done){
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
    done()
});

gulp.task('sass', function(done){
    gulp.src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
    done();    
});

gulp.task('default', gulp.series('message', 'copyFiles', 'imageMin', 'sass'));

gulp.task('watch', function(){
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    gulp.watch('src/images/*', gulp.series('imageMin'));
    gulp.watch('src/scss/*.scss', gulp.series('sass'));
    gulp.watch('src/*.html', gulp.series('copyFiles'))
        .on('change', browserSync.reload);
    gulp.watch('README.md', gulp.series('copyFiles'));
});