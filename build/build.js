require('./check-versions')()

process.env.NODE_ENV = 'production'
var argv = process.argv.splice(2);

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var fs = require('fs');
var fstream = require('fstream');
var tar = require('tar');
var zlib = require('zlib');
var moment = require('moment');

var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ));

    if(argv[0] == 'package'){
        fstream.Reader({
            path:path.join(__dirname, '..' ,'dist'),
            type:'Directory'
        }).pipe(tar.Pack())
        .pipe(zlib.Gzip())
        .pipe(fstream.Writer({
            path:path.join(__dirname,'..','package',moment().format('YYYY_MM_DD_HH_mm'),'GagaWord.tar.gz')
        }));
    }

  })
})
