/* global require, module */

var mergeTrees = require('broccoli-merge-trees');

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

module.exports = app.toTree();
