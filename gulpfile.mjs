import path from 'node:path'
import gulp from 'gulp';
import rename from 'gulp-rename';
import imagemin, {mozjpeg, optipng, svgo} from 'gulp-imagemin';
import webp from 'gulp-webp';
import svgstore from 'gulp-svgstore';
import cheerio from 'gulp-cheerio';
import {fileURLToPath} from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Изображения
export const img = () => {
  return gulp
  .src(path.join(__dirname, 'src/assets/img/**/*.{jpg,gif,png,jpeg,svg}'))
  .pipe(
    imagemin([
      optipng({optimizationLevel: 3}),
      mozjpeg({quality: 90, progressive: true}),
      svgo({
        plugins: [
          {
            removeDimensions: true,
          },
        ],
      }),
    ]),
  )
  .pipe(gulp.dest(path.join(__dirname, 'build/img')));
};

// Webp
export const webpImages = () => {
  return gulp
  .src(path.join(__dirname, 'src/assets/img/**/*.{jpg,gif,png,jpeg,svg}'))
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest(path.join(__dirname, 'build/img')));
};

// SVG спрайт
export const sprite = () => {
  return gulp
  .src(path.join(__dirname, 'src/assets/img/icons/icon-*.svg'))
  .pipe(svgstore({inlineSvg: true}))
  .pipe(
    cheerio({
      run: ($) => {
        $("symbol").attr("fill", "none");
      },
      parserOptions: {xmlMode: true},
    }),
  )
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest(path.join(__dirname, 'src/assets/img')));
};
