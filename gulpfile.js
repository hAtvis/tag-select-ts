var gulp = require('gulp')

var ts = require('gulp-typescript')
var tsConfig = require('./tsconfig.json')
var merge = require('merge2')
var debug = require('gulp-debug')
var assign = require('object-assign')

var esDir = 'es'
var libDir = 'lib'

gulp.task('compile', ['compile-es'], () => {
  compile()
})
gulp.task('compile-es', () => {
  compile(false)
})

function compile(modules) {
  var sources = [
    "components/**/*.tsx"
  ]
  let options = assign({}, tsConfig.compilerOptions) 
  if (modules === false) {
    delete options.target
  }

  const tsResult = gulp.src(sources)
    .pipe(debug())
    .pipe(ts(options))
  const dts = tsResult.dts.pipe(gulp.dest(modules === false ? libDir : esDir))
  const js = tsResult.js.pipe(gulp.dest(modules === false ? libDir : esDir))
  return merge([dts, js])
}


