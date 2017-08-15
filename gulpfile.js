
'use strict';

/*******************************************************************************
 * PREDIX UI CATALOG BUILD TOOLS
 *
 * The following gulp tasks are available for this project:
 *
 * - `gulp serve` - Run when developing the project. Continuously builds *.scss
 *                  files to the css/ directory. Runs BrowserSync to reload the
 *                  page whenever a file is changed.
 *
 * - `gulp build` - Run before releasing a new version of the project to
 *                  production. Builds *.scss files to the css/ directory,
 *                  processes _*.html files (minify, etc.) into
 *                  *.html files.
 ******************************************************************************/

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const pkg = require('./package.json');
const $ = require('gulp-load-plugins')();
const gulpSequence = require('gulp-sequence');
const importOnce = require('node-sass-import-once');
const stylemod = require('gulp-style-modules');
const browserSync = require('browser-sync').create();
const gulpif = require('gulp-if');
const combiner = require('stream-combiner2');
const bump = require('gulp-bump');
const argv = require('yargs').argv;
const rename = require('gulp-rename');
const symlink = require("gulp-sym");
const chmod = require('gulp-chmod');
const stream = require('merge-stream')();
const del = require('del');
const gitSync = require('gulp-git');
const execSync = require('child_process').execSync;
var request = require('request');
const imagemin = require("imagemin");
const webp = require("imagemin-webp");
const glob = require("glob");
const fse = require('fs-extra');
const md = require('./scripts/page-builder');
const {Analyzer, FSUrlLoader, generateAnalysis} = require('polymer-analyzer');

/*******************************************************************************
 * SETTINGS
 *
 * Configuration settings for various libraries used to process source files.
 * Read the documentation for each library for more information on what
 * specific configuration flags do.
 ******************************************************************************/

const sassOptions = {
  importer: importOnce,
  importOnce: {
    index: true,
    bower: true
  }
};

const browserSyncOptions = {
  port: 8080,
  notify: false,
  reloadOnRestart: true,
  logPrefix: `${pkg.name}`,
  https: false,
  files: ['*.*'],
  server: ['./', 'bower_components'],
  reloadDebounce: 1000
};

var src = ['index.html', 'favicon.ico', 'manifest.json', 'pages/**/*.html', 'elements/**/*.{html,json}', 'service-worker.js', 'type/**/*.*', 'bower_components/**/*.*', 'img/**/*.*', 'css/**/*.*', 'CNAME', 'sw.tmpl'];

/*******************************************************************************
 * BASIC UTILITIES
 *
 * Tasks and functions used across tasks to accomplish simple things.
 ******************************************************************************/

function handleError(err){
  console.log(err.toString());
  this.emit('end');
}

/*******************************************************************************
 * SASS BUILD PIPELINE
 *
 * Builds the *.scss files to the css/ directory. Runs appropriate preprocessing
 * and postprocessing to turn files in to style modules, etc.
 ******************************************************************************/

function buildCSS(){
  return combiner.obj([
    $.sass(sassOptions),
    $.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
      flexbox: false
    }),
    gulpif(!argv.debug, $.cssmin())
  ])
  .on('error', handleError);
}

gulp.task('sass', function() {
  return gulp.src(['./sass/*.scss'])
  .pipe(buildCSS())
  .pipe(stylemod({
    moduleId: function(file) {
      return path.basename(file.path, path.extname(file.path)) + '-styles';
    }
  }))
  .pipe(gulp.dest('css'))
  .pipe(browserSync.stream({match: 'css/*.html'}));
});

gulp.task('sass:clean', function() {
  return gulp.src(['.tmp', 'css'], {
    read: false
  })
  .pipe($.clean());
});

/*******************************************************************************
 * VERSION BUMP PIPELINE
 *
 * Run the appropriate `gulp bump:*` command to update project verion numbers in
 * bower.json and package.json manifest files before release.
 ******************************************************************************/

gulp.task('bump:patch', function(){
  gulp.src(['./bower.json', './package.json'])
  .pipe(bump({type:'patch'}))
  .pipe(gulp.dest('./'));
});

gulp.task('bump:minor', function(){
  gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type:'minor'}))
    .pipe(gulp.dest('./'));
});

gulp.task('bump:major', function(){
  gulp.src(['./bower.json', './package.json'])
  .pipe(bump({type:'major'}))
  .pipe(gulp.dest('./'));
});

/*******************************************************************************
 * COPY FILES INTO DIST
 * This task loops through an array of all the files that need to be in the dist folder, merges them into a stream, and returns that.
 * @usage Run `gulp copyFilesIntoDist` to copy files into the dist folder.
 * files/folders:
 * index.html
 * the pages folder (html files only)
 * the elements folder (html and json)
 * the css folder
 * the img folder
 * the type folder
 * the bower_components
 ******************************************************************************/

gulp.task('copyFilesIntoDist', ['sass'], function() {
    //the full array of what we want to end up in the dist folder/
   let copyFrom = src;

   //loop through our array to add each stream into the mergeStream process.
   copyFrom.forEach((fileOrFolder) => {
     let current;
     //do we have globbing? if not, just use the file/folder name.
     if (fileOrFolder.indexOf('*') > -1) {
      let firstIndex = fileOrFolder.indexOf('/');
      let copyName = fileOrFolder.substr(0, firstIndex);
      current = gulp.src([copyName + '/**/*.*']).pipe(gulp.dest('./dist/' + copyName));
     } else {
       current = gulp.src([fileOrFolder]).pipe(gulp.dest('./dist/'));
     }
     //add the current file/folder to the stream
     stream.add(current);
   });

   //and make sure it's not empty before we return it.
   return stream.isEmpty() ? null : stream;
});


/*******************************************************************************
 * DEVELOPMENT SERVE PIPELINE
 *
 * Run `gulp serve` during development to continuously process files and reload
 * the browser when files are updated.
 ******************************************************************************/

gulp.task('serve', ['sass', 'docs'], function() {
  browserSync.init(browserSyncOptions);
  gulp.watch(['_pages/**/*.md'], ['docs']);
  gulp.watch(['sass/*.scss'], ['sass']);
  gulp.watch(['css/*-styles.html', '*.html', 'pages/**/*.html']).on('change', browserSync.reload);
});

gulp.task('serve:sass', ['sass'], function() {
  gulp.watch(['sass/*.scss'], ['sass']);
});

gulp.task('default', function(callback) {
  console.log(`
!!! DEFAULT GULP TASK HAS CHANGED

Previously, running \`gulp\` on the predix-ui.github.io repo would create a
local build of the site in the dist/ folder that looked like the production
version TravisCI builds. This task no longer does this. Run \`gulp localBuild\`
if you want to perform this task.

This task now does the following:
  * compiles the sass/ files to css/
  * builds the _pages/ files to the pages/ directory
  * re-generates the service worker

And... you probably want to run \`gulp serve\` instead of this task. :)
    `);
  gulpSequence('sass', 'docs', 'generate-service-worker')(callback);
});

/*******************************************************************************
 * GIT PRODUCTION BUILD PIPELINE
 *
 * this task creates an orphan git branch, and does a git add/commit/push
 ******************************************************************************/

 gulp.task('gitStuff', function() {

   gitSync.checkout('master',{args : '--orphan', cwd : '.'}, (err) => {
     if (err) {
       console.log('git checkout error:' + err);
     }
     console.log('finished checkout successfully');
     //set the source to our working directory and exclude node_modules

     execSync(`rm -f .gitignore`);
     execSync(`touch .gitignore`);
     const gitIgnore = [
        'node_modules/',
        'caddyfile',
        'cert.crt',
        'cert.key',
        'HISTORY.md',
        'LICENSE.md',
        'README.md',
        'bower.json',
        'gulpfile.js',
        'id_rsa.enc',
        'package.json',
        'sass/*.*',
        'yarn.lock'];

    gitIgnore.forEach((val) =>{
      execSync(`echo "${val}" >> .gitignore`);
    });

     execSync(`git add --all`);
     execSync(`git commit -m 'master rebuild'`);
     execSync(`git push origin master --force`);


     });
 });

gulp.task('resetCloudflareCache', function() {
  var cloudflare_zone_identifier = process.env.cloudflare_zone_identifier,
      cloudflare = process.env.cloudflare;

  request({
      uri: 'https://api.cloudflare.com/client/v4/zones/' + cloudflare_zone_identifier + '/purge_cache',
      method:'DELETE',
      headers: {
        "X-Auth-Email" : "martin.wragg@ge.com",
        "X-Auth-Key" : cloudflare,
        "Content-Type" : "application/json"
      },
      body: '{"purge_everything" :true}'
    }, function(err, res, body) {
      if (err) {
        console.log(err);
      } else {
        console.log(res.body);
      }
    });
});

/*******************************************************************************
 * LOCAL BUILD PIPELINE
 *
 * Run `gulp` or `gulp localBuild` to emulate files for dist folder locally.
 ******************************************************************************/

gulp.task('localBuild', function(callback) {
  gulpSequence('sass', 'docs', 'copyFilesIntoDist', 'generate-service-worker')(callback);
});

/*******************************************************************************
 * PRODUCTION BUILD PIPELINE
 *
 * Run `gulp` or `gulp prodBuild` to prepare files for production before releasing
 * a new version of the project.
 ******************************************************************************/

gulp.task('prodBuild', function(callback) {
   gulpSequence('sass', 'docs','generate-service-worker', 'gitStuff', 'resetCloudflareCache')(callback);
});

/*******************************************************************************
 * ARE WE INSIDE TRAVIS?
 *
 * checks if we are inside the travis VM by testing the process.env.TRAVIS
 *
 ******************************************************************************/
 var isTravis = function() {
   return process.env.IS_TRAVIS && process.env.IS_TRAVIS.toString() === "true";
 };

/*******************************************************************************
 * SERVICE WORKER
 *
 * Builds (or rebuilds) a service worker to cache files on the site's app shell.
 * Rebuilding the service worker invalidates the user's cache on the next
 * visit to the site ensuring they get new files.
 ******************************************************************************/

 gulp.task('generate-service-worker', function(callback) {
   var swPrecache = require('sw-precache'),
       rootDir =  '.' ;

       console.log("isTravis = " + isTravis()  );
   swPrecache.write(path.join(rootDir, '/service-worker.js'), {
     staticFileGlobs: [rootDir + '/index.html',
                       rootDir + '/',
                       rootDir + '/manifest.json',
                       rootDir + '/img/**',
                       rootDir + '/type/**',
                       rootDir + '/pages/**',
                       rootDir + '/elements/**/*.{html,json}',
                       rootDir + '/css/**',
                       rootDir + '/bower_components/px-theme/**/*.html',
                       rootDir + '/bower_components/px-demo/*.html',
                       rootDir + '/bower_components/px-demo/css/*.html',
                       rootDir + '/bower_components/px-spinner/**/*.html',
                       rootDir + '/bower_components/polymer/polymer*.html',
                       rootDir + '/bower_components/webcomponentsjs/webcomponents-lite.js',
                       rootDir + '/bower_components/webcomponentsjs/webcomponents-lite.min.js',
                       rootDir + '/bower_components/hydrolysis/hydrolysis.*',
                       rootDir + '/bower_components/app-route/app-*.html',
                       rootDir + '/bower_components/iron-ajax/iron-*.html',
                       rootDir + '/bower_components/iron-location/iron-*.html',
                       rootDir + '/bower_components/iron-collapse/iron-collapse.html',
                       rootDir + '/bower_components/iron-label/iron-label.html',
                       rootDir + '/bower_components/iron-checked-element-behavior/iron-checked-element-behavior.html',
                       rootDir + '/bower_components/iron-iconset-svg/iron-iconset-svg.html',
                       rootDir + '/bower_components/iron-icon/iron-icon.html',
                       rootDir + '/bower_components/iron-meta/iron-meta.html',
                       rootDir + '/bower_components/promise-polyfill/promise-polyfill-lite.html',
                       rootDir + '/bower_components/promise-polyfill/Promise.js',
                       rootDir + '/bower_components/iron-flex-layout/iron-flex-layout.html',
                       rootDir + '/bower_components/iron-resizable-behavior/iron-resizable-behavior.html',
                       rootDir + '/bower_components/px-icon-set/*.html',
                       rootDir + '/bower_components/px-toggle/**/*.{html, js}'],
     stripPrefix: rootDir,
     maximumFileSizeToCacheInBytes: 6000000, //this needed so hydrolysis is cached...
     templateFilePath: rootDir + '/sw.tmpl',
     navigateFallback: '/index.html',
     navigateFallbackWhitelist: ['/index.html']
   }, callback);
 });

gulp.task('compress-images', function(){

  let imgFolders = [
    './img',
    './pages/guides/vis-resources',
    './img/gallery',
    './img/guidelines',
    './pages/migration/img'
  ];

  imgFolders.forEach((folder) =>{
    console.log(folder)
    imagemin([`${folder}/*.png`], folder, {
      plugins: [webp({
        lossless: true // Losslessly encode images
      })]
    });
    imagemin([`${folder}/*.jpg`], folder, {
      plugins: [webp({
        quality: 65 // Quality setting from 0 to 100
      })]
    });
  });

});

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, contents) => {
      if (err) reject(err);
      resolve(contents);
    });
  });
};

function buildMdFile(filePath) {
  const srcFilePath = path.join(__dirname, filePath);
  const destFilePath = path.join(__dirname, filePath.replace(/^\_pages/, 'pages').replace(/\.md$/, '.html'));
  return readFile(srcFilePath)
    .then(text => md.fromText(text))
    .then(html => fse.outputFile(destFilePath, html));
};

function buildAPIAnalyzerFiles(pxElementPaths){
  // Set up Polymer Analyzer with 'bower_components' as its base directory
  let analyzer = new Analyzer({
      urlLoader: new FSUrlLoader('./bower_components')
  });

  // Run analyzer separately for each so we can write the descriptors into separate files.
  // Promise.all to prevent premature completion
  return Promise.all(pxElementPaths.map(elementDir => analyzeRepo(elementDir, analyzer)));
};

function analyzeRepo(elementDir, analyzer) {
  // takes '/bower_components/px-foo-bar/' and extracts 'px-foo-bar'
  const elementName = elementDir.match(/\/(px\-.*)\//)[1];
  // find all elements in this folder that begin with the element name
  return getFilesForRepo(elementDir, elementName)
    .then(files => {
      if (!files.length) {
        // No .html files found, likely a -design repo
        return Promise.reject('NO_HTML_FILE');
      }
      // console.log(`Analyzing ${elementName} files: ${files.join(', ')}`)
      return analyzer.analyze(files);
    })
    .then(analysis => {
      analysis = filterAnalysis(generateAnalysis(analysis, './bower_components'), elementName);
      // console.log(`Writing API output to ${elementName}/${elementName}-api.json`);
      return fse.outputFile(`bower_components/${elementName}/${elementName}-api.json`, JSON.stringify(analysis));
    })
    .catch(e => {
      if (e !== 'NO_HTML_FILE') {
        console.log(`Error for ${elementName}:\n${e}`);
      }
    });
};

function filterAnalysis(analysis, elementName) {
  let belongsToElement = new RegExp(`^\.\.\/${elementName}\/`);
  return {
    schema_version: analysis.schema_version,
    elements: analysis.elements ? analysis.elements.filter(a => belongsToElement.test(a.path)) : []
  };
};

function getFilesForRepo(elementDir, elementName) {
  return new Promise((resolve) => {
    glob(`${elementDir}${elementName}*.html`, (err, files) => {
      if (!files.length) {
        return resolve([]);
      }
      return resolve(files.map(f => f.match(/bower_components\/(px-.+\/px\-.+html)/)[1]));
    });
  });
};

function processPagesJSON(text) {
  const pages = JSON.parse(text);
  const redirects = {};
  const routes = {};
  let queue = pages.map(page => ({ page: page, route: `/${page.path}` }));
  while (queue.length) {
    let {page, route} = queue.shift();
    // Assign path from root to route
    page._route = route;
    // Inline keywords
    if (Array.isArray(page.keywords) && page.keywords.length) {
      page._keywords = page.keywords.join(' ');
    }
    // Parse out redirects and add to global redirects list
    if (Array.isArray(page.redirects) && page.redirects.length) {
      for (let redirect of page.redirects) {
        if (redirects[redirect]) {
          console.error(`
Redirects cannot appear more than once. The direct to ${redirect}
is set by ${path} and ${redirects[redirect]}. Delete duplicates.
          `);
        }
        redirects[redirect] = route;
      }
    }
    // Add to global routes list
    if (routes[route]) {
      console.error(`
Routes cannot appear more than once. The following route is defined
more than once, delete any duplicates:
${routes[route]}
      `);
    }
    routes[route] = Object.assign(page, {});
    // Add children to queue, if any
    if (Array.isArray(page.pages) && page.pages.length) {
      queue = queue.concat(page.pages.map(p => ({ page: p, route: `${route}/${p.path}` })));
    }
  }
  return Promise.resolve({ pages: pages, redirects: redirects, routes: routes });
};

gulp.task('docs:clean', function(){
  return gulp.src(['pages'], {
    read: false
  })
  .pipe($.clean());
});

/*
 * Reads any markdown (suffix .md) files in _pages/, renders the markdown into
 * HTML, and writes file to pages/ at the same path with a .html suffix.
 */
gulp.task('docs:md', function(cb){
  glob('_pages/**/*.md', (err, files) => {
    Promise.all(files.map(buildMdFile)).then(() => cb());
  });
});

gulp.task('docs:api', function(cb){
  glob('bower_components/px-*/', (err, files) => {
    buildAPIAnalyzerFiles(files)
      .then(() => cb());
  });
});

gulp.task('docs:pages-json', function(cb){
  const pagesPath = path.join(__dirname, 'elements', 'px-catalog', 'pages.json');
  const outputPath = path.join(__dirname, 'pages', 'app-data.json');
  readFile(pagesPath)
    .then(processPagesJSON)
    .then(pagesData => fse.outputFile(outputPath, JSON.stringify(pagesData,null,'')))
    .then(() => cb())
    .catch(e => console.error(`The pages.json file is invalid: ${e}`));
});

/*
 * Copies any files in _pages/ that do not end with .md to the pages/ dir.
 */
gulp.task('docs:copy-non-md', function(){
  return gulp.src(['./_pages/**/*', '!./_pages/**/*.md'])
    .pipe(gulp.dest('./pages/'));
});

gulp.task('docs', function(callback) {
  gulpSequence('docs:clean', 'docs:copy-non-md', 'docs:md', 'docs:api', 'docs:pages-json')(callback);
});
