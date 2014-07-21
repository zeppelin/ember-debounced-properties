/* global require, module */

var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');

var appTree    = mergeTrees(['app', 'app-addon'], { overwrite: true });
var vendorTree = mergeTrees(['vendor', 'vendor-addon']);

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  name: require('./package.json').name,

  trees: {
    app: appTree,
    vendor: vendorTree
  },

  getEnvJSON: require('./config/environment')
});

var sinon = pickFiles('vendor/sinon', {
  srcDir: '/',
  files: ['index.js'],
  destDir: '/assets/sinon'
});

module.exports = mergeTrees([app.toTree(), sinon]);
