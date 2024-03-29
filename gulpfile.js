const { src, dest, watch, parallel, series } = require('gulp');



const gulp = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const nunjucksRender = require('gulp-nunjucks-render');
const del = require('del');
const { notify } = require('browser-sync');
const browserSync = require('browser-sync').create();
const critical = require('critical');

function scriptsAbout() { return scriptsCreate('about') };
function scriptsBlog() { return scriptsCreate('blog') };
function scriptsContacts() { return scriptsCreate('contacts') };
function scriptsIndex() { return scriptsCreate('index') };
function scriptsLogin() { return scriptsCreate('login') };
function scriptsProduct() { return scriptsCreate('product') };
function scriptsShop() { return scriptsCreate('shop') };
function scriptsTerms() { return scriptsCreate('terms') };

function scriptsCreate(name) {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
    'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
    'node_modules/mixitup/dist/mixitup.min.js',
    `app/js/${name}.js`,
  ])
    .pipe(concat(`${name}.js`))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(dest('app/js-min'))
    .pipe(browserSync.stream())
};

// function html() {
//   return src('app/**/*.html')
//     .pipe(htmlmin({ collapseWhitespace: true }))
//     .pipe(dest('app/'));
// };

function img() {
  return src('app/images/**/*.*')
    .pipe(imagemin())
    .pipe(dest('app/images/'))
};

// function critGenerate() {
//   critical.generate({
//     inline: true,
//     base: './',
//     src: 'app/_index.html',
//     css: ['app/css/index.min.css'],
//     width: 1300,
//     height: 900,
//     target: {
//       css: 'css/critical/critical.css',
//       html: 'app/index.html',
//       uncritical: 'css/critical/uncritical.css',
//     },
//     extract: true,
//   });
// };

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
    notify: false
  })
}

function nunjucks() {
  return src('app/*.njk')
    .pipe(nunjucksRender())
    .pipe(dest('app'))
    .pipe(browserSync.stream())
}

function styles() {
  return src('app/scss/*.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function dist() {
  return src([
    'app/**/*.html',
    'app/css/**/*.css',
    'app/images/**/*',
    'app/js/main.min.js'
  ], { base: 'app' })
    .pipe(dest('dist'))
}

function cleanDist() {
  return del('dist')
}

function watching() {
  watch(['app/**/*.scss'], styles);
  watch(['app/*.njk'], nunjucks);
  watch(['app/js/about.js'], scriptsAbout);
  watch(['app/js/blog.js'], scriptsBlog);
  watch(['app/js/contacts.js'], scriptsContacts);
  watch(['app/js/index.js'], scriptsIndex);
  watch(['app/js/login.js'], scriptsLogin);
  watch(['app/js/product.js'], scriptsProduct);
  watch(['app/js/shop.js'], scriptsShop);
  watch(['app/js/terms.js'], scriptsTerms);
  watch(['app/**/*.html']).on('change', browserSync.reload);
}

function scripts() {
  scriptsAbout();
  scriptsBlog();
  scriptsContacts();
  scriptsIndex();
  scriptsLogin();
  scriptsProduct();
  scriptsShop();
  scriptsTerms();
};

exports.styles = styles;
exports.browsersync = browsersync;
exports.watching = watching;
exports.img = img;
// exports.html = html;
exports.nunjucks = nunjucks;
exports.cleanDist = cleanDist;
exports.dist = series(cleanDist, dist);


exports.default = parallel(nunjucks, img, styles, scripts, browsersync, watching);