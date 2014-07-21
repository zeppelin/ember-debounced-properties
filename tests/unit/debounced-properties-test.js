/* global sinon */

import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';
import DebouncedPropertiesMixin from 'ember-cli-debounced-properties/mixins/debounced-properties';
var run = Ember.run;
var Obj, obj, clock;

Obj = Ember.Object.extend(DebouncedPropertiesMixin, {
  debouncedProperties: ['email'],
  email: ''
});


moduleFor('mixin:debounced-properties', 'DebouncedPropertiesMixin', {
  setup: function() {
    clock = sinon.useFakeTimers();
    obj = Obj.create();
  },

  teardown: function() {
    run(obj, 'destroy');
    clock.restore();
  }
});

test('default delay', function() {
  expect(3);

  obj.set('email', 'hello@example.com');

  equal(obj.get('debouncedEmail'), undefined, "`debouncedEmail` isn't updated immediately.");

  clock.tick(900);
  equal(obj.get('debouncedEmail'), undefined, "`debouncedEmail` isn't updated before 1000ms passed.");

  clock.tick(100);
  equal(obj.get('debouncedEmail'), 'hello@example.com', "`debouncedEmail` is updated after 1000ms passed.");
});

test('custom delay', function() {
  expect(2);

  obj.set('emailDelay', 1500);
  obj.set('email', 'hello@example.com');

  clock.tick(1400);
  equal(obj.get('debouncedEmail'), undefined, "`debouncedEmail` isn't updated before 1500ms passed.");

  clock.tick(100);
  equal(obj.get('debouncedEmail'), 'hello@example.com', "`debouncedEmail` is updated after 1500ms passed.");
});
