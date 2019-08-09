const watchify = require('watchify');
const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const log = require('gulplog');
const sourcemaps = require('gulp-sourcemaps');
const assign = require('lodash.assign');

// add custom browserify options here
const customOptsInteractWithCanvas = {
    entries: ['./src/interact-with-canvas.js'],
    debug: true
};
const customOptsApp = {
    entries: ['./src/app.js'],
    debug: true
};
const optsInteractWithCanvas = assign({}, watchify.args, customOptsInteractWithCanvas);
const optsApp = assign({}, watchify.args, customOptsApp);
const b = watchify(browserify(optsApp));
const c = watchify(browserify(optsInteractWithCanvas));

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('bundleApp', bundleApp);
gulp.task('bundleInteractWithCanvas', bundleInteractWithCanvas);
gulp.task('js', gulp.series('bundleApp', 'bundleInteractWithCanvas'));
b.on('update', bundleApp); // on any dep update, runs the bundler
b.on('update', bundleInteractWithCanvas); // on any dep update, runs the bundler
b.on('log', log.info); // output build logs to terminal


function bundleApp() {
    return b.bundle()
    // log errors if they happen
        .on('error', log.error.bind(log, 'Browserify Error'))
        .pipe(source('app.js'))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        // optional, remove if you dont want sourcemaps
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        // Add transformation tasks to the pipeline here.
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./public/'));
}

function bundleInteractWithCanvas() {
    return c.bundle()
    // log errors if they happen
        .on('error', log.error.bind(log, 'Browserify Error'))
        .pipe(source('interact-with-canvas.js'))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        // optional, remove if you dont want sourcemaps
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        // Add transformation tasks to the pipeline here.
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./public/'));
}