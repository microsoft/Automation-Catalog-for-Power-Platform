// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const gulp = require("gulp");
const jeditor = require("gulp-json-editor");
const minimist = require('minimist');
const crypto = require('crypto');

const configData = {
    string: ['clientId', 'appService'],
    default: { clientId: '', appService: '' }
  };
  
  const configDataSplit = minimist(process.argv.slice(2), configData);
  
  gulp.task('setup:manifest', function () {
      return gulp.src('D:/a/_work/1/s/AutomationCatalogForPowerPlatform/ACPPClient/appPackage/manifest.json')
          .pipe(jeditor(function (json) {
              json.id = crypto.randomUUID();
              json.developer.websiteUrl = `${configDataSplit.appService}.azurewebsites.net`;
              json.staticTabs[0].contentUrl = `https://${configDataSplit.appService}.azurewebsites.net/StaticContent/hometab/index.html?name={loginHint}&tenant={tid}&theme={theme}`;
              json.staticTabs[0].websiteUrl = `https://${configDataSplit.appService}.azurewebsites.net/StaticContent/hometab/index.html#/tab`;
              json.validDomains = `${configDataSplit.appService}.azurewebsites.net`;
              json.webApplicationInfo.id = configDataSplit.clientId;
              json.webApplicationInfo.resource = `api://${configDataSplit.appService}.azurewebsites.net/${configDataSplit.clientId}`;
              return json; // must return JSON object.
          }))
          .pipe(gulp.dest('D:/a/_work/1/s/AutomationCatalogForPowerPlatform/ACPPClient/appPackage'));
  });

//Task to copy files from src/i18n/locales to static/locales

var fs = require('fs');

gulp.task('copy-locales', function () {
    //not required for local development as we are using symlinks to the locale folder
    return gulp.src('/i18n/locales/**/*', { root: '/src' })
        .pipe(gulp.dest('/build/static/locales'));
});

gulp.task('symlink-locales', function (done) {
    if (fs.existsSync('build/static/locales')) {
        fs.unlinkSync('build/static/locales');
    }
    fs.symlink('src/i18n/locales', 'build/static/locales', 'junction', function (err) {
        if (err) {
            console.error('An error occurred while creating symlink:', err);
        } else {
            console.log('Symlink created successfully');
        }
        done();
    });
});

