const del = require('del');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const replace = require('gulp-replace');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const rtlcss = require('gulp-rtlcss');
const cleanCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');

const { reload } = browserSync;
const Promise = require('promise');


/*-----------------------------------------------
|   Paths
-----------------------------------------------*/
const CSS = 'pages/assets/css';
const JS = 'pages/assets/js';
const lib = 'pages/assets/lib';
const Paths = {
  HERE: './',
  PAGES: {
    FOLDER: 'pages',
    ALL: 'pages/**/*.*',
    HTML: 'pages/**/*.html',
  },
  JS: {
    ALL: 'js/**/*.js',
    BOOTSTRAP: [
      './js/bootstrap/util.js',
      './js/bootstrap/alert.js',
      './js/bootstrap/button.js',
      './js/bootstrap/carousel.js',
      './js/bootstrap/collapse.js',
      './js/bootstrap/dropdown.js',
      './js/bootstrap/modal.js',
      './js/bootstrap/tooltip.js',
      './js/bootstrap/popover.js',
      './js/bootstrap/scrollspy.js',
      './js/bootstrap/tab.js',
      './js/bootstrap/toast.js',
    ],
    THEME: [
      'js/theme/config.dark-mode.js', // Required
      'js/theme/Utils.js', // Required
      'js/theme/bootstrap-navbar.js', // Required
      'js/theme/bootstrap-select-menu.js', // Required
      'js/theme/detector.js', // Required
      'js/theme/forms.js', // Required
      'js/theme/stickyfill.js', // Required
      'js/theme/stickykit.js', // Required
      'js/theme/tooltip.js', // Required
      'js/theme/navbar.js', // Required
      'js/theme/emojionearea.js', // Required
      'js/theme/**/!(Utils | bootstrap-navbar | bootstrap-select-menu | detector | forms | stickyfill | stickykit | tooltip | navbar | emojionearea | config.dark-mode)*.js',
      '!js/theme/config.navbar-vertical.js',
    ],
    CONFIG_NAVBAR_VERTICAL: [
      'js/theme/config.navbar-vertical.js',
    ],
    PLUGINS: ['js/plugins/all.min.js'],
  },
  SCSS: {
    ALL: 'scss/**/*.scss',
    THEME: 'scss/theme.scss',
    DARK: 'scss/theme-dark.scss',
  },
  ASSETS: {
    ALL: 'pages/assets/**/*.*',
    FONTS: 'pages/assets/fonts/**/*.*',
    VIDEO: 'pages/assets/video/**/*.*',
    IMG: 'pages/assets/img/**/*.*',
    JS: 'pages/assets/js',
  },
  CSS: 'pages/assets/css',
  DEPENDENCIES: {
    jquery: {
      FROM: 'node_modules/jquery/dist/jquery.min.js',
      TO: JS,
    },
    popper: {
      FROM: 'node_modules/popper.js/dist/umd/popper.min.js',
      TO: JS,
    },
    'bootstrap-js': {
      FROM: 'node_modules/bootstrap/js/dist/!(index)*.js',
      TO: 'js/bootstrap',
    },
    'bootstrap-scss': {
      FROM: 'node_modules/bootstrap/scss/**/*.scss',
      TO: 'scss/bootstrap',
    },
    prismjs: {
      FROM: ['node_modules/prismjs/prism.js', 'node_modules/prismjs/themes/prism-okaidia.css'],
      TO: lib,
    },
    stickyfilljs: {
      FROM: 'node_modules/stickyfilljs/dist/stickyfill.min.js',
      TO: lib,
    },
    'jquery-countdown': {
      FROM: 'node_modules/jquery-countdown/dist/jquery.countdown.min.js',
      TO: lib,
    },
    'sticky-kit': {
      FROM: 'node_modules/sticky-kit/dist/**/*.*',
      TO: lib,
    },
    'chart.js': {
      FROM: ['node_modules/chart.js/dist/Chart.min.js', 'node_modules/chart.js/dist/Chart.bundle.min.js'],
      TO: lib,
    },
    '@fortawesome': {
      FROM: 'node_modules/@fortawesome/fontawesome-free/js/all.min.js',
      TO: lib,
    },
    'progressbar.js': {
      FROM: 'node_modules/progressbar.js/dist/progressbar.min.js',
      TO: lib,
    },
    toastr: {
      FROM: 'node_modules/toastr/build/**/*.*',
      TO: lib,
    },
    fancybox: {
      FROM: 'node_modules/@fancyapps/fancybox/dist/**/*.*',
      TO: lib,
    },
    plyr: {
      FROM: 'node_modules/plyr/dist/**/*.*',
      TO: lib,
    },
    'jquery.mb.ytplayer': {
      FROM: ['node_modules/jquery.mb.ytplayer/dist/css/jquery.mb.YTPlayer.min.css', 'node_modules/jquery.mb.ytplayer/dist/jquery.mb.YTPlayer.min.js'],
      TO: lib,
    },
    'owl.carousel': {
      FROM: ['node_modules/owl.carousel/dist/owl.carousel.js', 'node_modules/owl.carousel/dist/assets/owl.carousel.css'],
      TO: lib,
    },
    lightbox2: {
      FROM: 'node_modules/lightbox2/dist/**/*.*',
      TO: lib,
    },
    datatables: {
      FROM: 'node_modules/datatables/media/**/*.*',
      TO: lib,
    },
    'datatables-bs4': {
      FROM: ['node_modules/datatables.net-bs4/js/dataTables.bootstrap4.min.js', 'node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css'],
      TO: lib,
    },
    'datatables.net-responsive': {
      FROM: ['node_modules/datatables.net-responsive/js/dataTables.responsive.js'],
      TO: lib,
    },
    'datatables.net-responsive-bs4': {
      FROM: ['node_modules/datatables.net-responsive-bs4/js/responsive.bootstrap4.js', 'node_modules/datatables.net-responsive-bs4/css/responsive.bootstrap4.css'],
      TO: lib,
    },
    'typed.js': {
      FROM: 'node_modules/typed.js/lib/typed.js',
      TO: lib,
    },
    flatpickr: {
      FROM: ['node_modules/flatpickr/dist/flatpickr.min.css', 'node_modules/flatpickr/dist/themes/dark.css', 'node_modules/flatpickr/dist/flatpickr.min.js'],
      TO: lib,
    },
    is_js: {
      FROM: 'node_modules/is_js/is.min.js',
      TO: lib,
    },
    select2: {
      FROM: ['node_modules/select2/dist/css/select2.min.css', 'node_modules/select2/src/?(scss)/**/*.*', 'node_modules/select2/dist/js/select2.min.js'],
      TO: lib,
    },
    tinymce: {
      FROM: 'node_modules/tinymce/**/*.*',
      TO: lib,
    },
    'raty-js': {
      FROM: 'node_modules/raty-js/lib/**/*',
      TO: lib,
    },
    'emojionearea': {
      FROM: ['node_modules/emojionearea/dist/emojionearea.min.css', 'node_modules/emojionearea/dist/emojionearea.min.js'],
      TO: lib,
    },
    'lodash': {
      FROM: ['node_modules/lodash/lodash.min.js'],
      TO: lib,
    },
    'perfect-scrollbar': {
      FROM: ['node_modules/perfect-scrollbar/dist/perfect-scrollbar.js', 'node_modules/perfect-scrollbar/css/perfect-scrollbar.css'],
      TO: lib,
    },
    'twitter-bootstrap-wizard': {
      FROM: ['node_modules/twitter-bootstrap-wizard/jquery.bootstrap.wizard.min.js'],
      TO: lib,
    },
    'jquery-validation': {
      FROM: ['node_modules/jquery-validation/dist/jquery.validate.min.js'],
      TO: lib,
    },
    'dropzone': {
      FROM: ['node_modules/dropzone/dist/min/dropzone.min.js', 'node_modules/dropzone/dist/min/dropzone.min.css'],
      TO: lib,
    },
    'lottie': {
      FROM: ['node_modules/lottie-web/build/player/lottie.min.js'],
      TO: lib,
    },
    'leaflet': {
      FROM: ['node_modules/leaflet/dist/leaflet.js', 'node_modules/leaflet/dist/leaflet.css'],
      TO: lib,
    },
    'leaflet.markercluster': {
      FROM: [
        'node_modules/leaflet.markercluster/dist/leaflet.markercluster.js', 
        'node_modules/leaflet.markercluster/dist/MarkerCluster.css',
        'node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css',
      ],
      TO: lib,
    },
    'leaflet.tilelayer.colorfilter': {
      FROM: [ 'node_modules/leaflet.tilelayer.colorfilter/src/leaflet-tilelayer-colorfilter.min.js'],
      TO: lib,
    },
  },
  GENERATED: [
    'js/bootstrap',
    'scss/bootstrap',
    'pages/assets/css',
    'pages/assets/js',
  ],
};


/*-----------------------------------------------
|   Cleaning
-----------------------------------------------*/
gulp.task('clean', () => del(Paths.GENERATED, { force: true }));


/*-----------------------------------------------
|   SCSS
-----------------------------------------------*/
gulp.task('scss', () => gulp.src(Paths.SCSS.THEME)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({ cascade: false }))
  .pipe(sourcemaps.write('.'))
  .pipe(plumber.stop())
  .pipe(gulp.dest(Paths.CSS))
  .pipe(browserSync.stream()));

gulp.task('scss:min', () => gulp.src(Paths.SCSS.THEME)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({ cascade: false }))
  .pipe(cleanCSS({ compatibility: 'ie9' }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(sourcemaps.write('.'))
  .pipe(plumber.stop())
  .pipe(gulp.dest(Paths.CSS))
  .pipe(browserSync.stream()));
  
gulp.task('scss:dark', () => gulp.src(Paths.SCSS.DARK)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({ cascade: false }))
  .pipe(sourcemaps.write('.'))
  .pipe(plumber.stop())
  .pipe(gulp.dest(Paths.CSS))
  .pipe(browserSync.stream()));

gulp.task('scss:dark:min', () => gulp.src(Paths.SCSS.DARK)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({ cascade: false }))
  .pipe(cleanCSS({ compatibility: 'ie9' }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(sourcemaps.write('.'))
  .pipe(plumber.stop())
  .pipe(gulp.dest(Paths.CSS))
  .pipe(browserSync.stream()));

gulp.task('scss:rtl', () => gulp.src(Paths.SCSS.THEME)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({ cascade: false }))
  .pipe(rtlcss()) // Convert to RTL.
  .pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename.
  .pipe(sourcemaps.write('.'))
  .pipe(plumber.stop())
  .pipe(gulp.dest(Paths.CSS))
  .pipe(browserSync.stream()));

gulp.task('scss:rtl:min', () => gulp.src(Paths.SCSS.THEME)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({ cascade: false }))
  .pipe(rtlcss()) // Convert to RTL.
  .pipe(cleanCSS({ compatibility: 'ie9' }))
  .pipe(rename({ suffix: '-rtl.min' }))
  .pipe(sourcemaps.write('.'))
  .pipe(plumber.stop())
  .pipe(gulp.dest(Paths.CSS))
  .pipe(browserSync.stream()));

gulp.task('scss:dark:rtl', () => gulp.src(Paths.SCSS.DARK)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({ cascade: false }))
  .pipe(rtlcss()) // Convert to RTL.
  .pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename.
  .pipe(sourcemaps.write('.'))
  .pipe(plumber.stop())
  .pipe(gulp.dest(Paths.CSS))
  .pipe(browserSync.stream()));

gulp.task('scss:dark:rtl:min', () => gulp.src(Paths.SCSS.DARK)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({ cascade: false }))
  .pipe(rtlcss()) // Convert to RTL.
  .pipe(cleanCSS({ compatibility: 'ie9' }))
  .pipe(rename({ suffix: '-rtl.min' }))
  .pipe(sourcemaps.write('.'))
  .pipe(plumber.stop())
  .pipe(gulp.dest(Paths.CSS))
  .pipe(browserSync.stream()));

/*-----------------------------------------------
|   JavaScript
-----------------------------------------------*/
gulp.task('js:bootstrap', () => gulp.src(Paths.JS.BOOTSTRAP)
  .pipe(concat('bootstrap.js'))
  .pipe(replace(/^(export|import).*/gm, ''))
  .pipe(babel({
    compact: false,
    presets: [
      [
        'env', {
          modules: false,
          loose: true,
        },
      ],
    ],
    plugins: [
      process.env.PLUGINS && 'transform-es2015-modules-strip',
      '@babel/plugin-proposal-object-rest-spread',
    ].filter(Boolean),
  }))
  .pipe(gulp.dest(Paths.ASSETS.JS))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(Paths.ASSETS.JS))
  .pipe(reload({ stream: true })));

gulp.task('js:theme', () => gulp.src(Paths.JS.THEME)
  .pipe(eslint({ fix: true }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .pipe(concat('theme.js'))
  .pipe(replace(/^(export|import).*/gm, ''))
  .pipe(babel({
    compact: false,
    presets: [
      [
        'env',
        {
          modules: false,
          loose: true,
        },
      ],
    ],
    plugins: [
      process.env.PLUGINS && 'transform-es2015-modules-strip',
      '@babel/plugin-proposal-object-rest-spread',
      'transform-strict-mode',
    ].filter(Boolean),
  }))
  .pipe(gulp.dest(Paths.ASSETS.JS))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(Paths.ASSETS.JS))
  .pipe(reload({ stream: true })));

gulp.task('js:plugins', () => gulp.src(Paths.JS.PLUGINS)
  .pipe(concat('plugins.js'))
  .pipe(replace(/^(export|import).*/gm, ''))
  .pipe(babel({
    compact: false,
    presets: [
      [
        'env', {
          modules: false,
          loose: true,
        },
      ],
    ],
    plugins: [
      process.env.PLUGINS && 'transform-es2015-modules-strip',
      '@babel/plugin-proposal-object-rest-spread',
    ].filter(Boolean),
  }))
  .pipe(gulp.dest(Paths.ASSETS.JS))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(Paths.ASSETS.JS))
  .pipe(reload({ stream: true })));

gulp.task('js:config-vertical-navbar', () => gulp.src(Paths.JS.CONFIG_NAVBAR_VERTICAL)
  .pipe(eslint({ fix: true }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .pipe(concat('config.navbar-vertical.js'))
  .pipe(replace(/^(export|import).*/gm, ''))
  .pipe(babel({
    compact: false,
    presets: [
      [
        'env',
        {
          modules: false,
          loose: true,
        },
      ],
    ],
    plugins: [
      process.env.PLUGINS && 'transform-es2015-modules-strip',
      '@babel/plugin-proposal-object-rest-spread',
      'transform-strict-mode',
    ].filter(Boolean),
  }))
  .pipe(gulp.dest(Paths.ASSETS.JS))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(Paths.ASSETS.JS)));

gulp.task('js', gulp.parallel('js:bootstrap', 'js:plugins', 'js:theme', 'js:config-vertical-navbar'));


/*-----------------------------------------------
|   Dependencies
-----------------------------------------------*/
gulp.task('copy:dependency', () => {
  const promises = Object.keys(Paths.DEPENDENCIES).map(item => new Promise((resolve, reject) => {
    gulp.src(Paths.DEPENDENCIES[item].FROM)
      .pipe(gulp.dest((Paths.DEPENDENCIES[item].TO === lib) ? `${Paths.DEPENDENCIES[item].TO}/${item}` : Paths.DEPENDENCIES[item].TO))
      .on('end', (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve();
        }
      });
  }));
  return Promise.all(promises);
});


/*-----------------------------------------------
|   Watching
-----------------------------------------------*/
gulp.task('watch', () => {
  gulp.watch(Paths.SCSS.ALL, gulp.series('scss', 'scss:dark'));

  gulp.watch(Paths.JS.THEME, gulp.series('js', (done) => {
    reload();
    done();
  }));

  gulp.watch(Paths.JS.CONFIG_NAVBAR_VERTICAL , gulp.series('js', (done) => {
    reload();
    done();
  }));

  gulp.watch(Paths.JS.PLUGINS, gulp.series('js', (done) => {
    reload();
    done();
  }));

  gulp.watch([Paths.PAGES.HTML, Paths.ASSETS.FONTS, Paths.ASSETS.VIDEO, Paths.ASSETS.IMG], (done) => {
    reload();
    done();
  });
});


/*-----------------------------------------------
|   Serve
-----------------------------------------------*/
gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: Paths.PAGES.FOLDER,
    },
    // proxy: '127.0.0.1:8010',
    port: 3000,
    open: true,
    notify: false,
  });
});


/*-----------------------------------------------
|   Starting everything
-----------------------------------------------*/
gulp.task('default', gulp.series('copy:dependency', 'scss', 'scss:dark', 'scss:rtl', 'scss:dark:rtl', 'js', gulp.parallel('watch', 'serve')));
