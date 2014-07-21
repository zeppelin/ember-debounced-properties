'use strict';

var path = require('path');
var fs   = require('fs');

function EmberCLIDebouncedProperties(project) {
  this.project = project;
  this.name    = 'Ember CLI Debounced Properties';
}

function unwatchedTree(dir) {
  return {
    read:    function() { return dir; },
    cleanup: function() { }
  };
}

EmberCLIDebouncedProperties.prototype.treeFor = function treeFor(name) {
  var treePath =  path.join('node_modules', 'ember-cli-debounced-properties', name + '-addon');

  if (fs.existsSync(treePath)) {
    return unwatchedTree(treePath);
  }
};

EmberCLIDebouncedProperties.prototype.included = function included(app) {
  this.app = app;

  // this.app.import('vendor/ember-cli-debounced-properties/styles/style.css');
};

module.exports = EmberCLIDebouncedProperties;
