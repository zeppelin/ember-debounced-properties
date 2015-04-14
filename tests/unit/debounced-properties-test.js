/* global sinon */

import Ember from 'ember';
import { module } from 'qunit';
import { test } from 'ember-qunit';
import DebouncedPropertiesMixin from 'ember-debounced-properties/mixin';
const { run } = Ember;
let Obj, obj, clock;

Obj = Ember.Object.extend(DebouncedPropertiesMixin, {
  debouncedProperties: ['email'],
  email: 'initial value'
});


module('DebouncedPropertiesMixin', {
  setup: function() {
    clock = sinon.useFakeTimers();
    obj = Obj.create();
  },

  teardown: function() {
    run(obj, 'destroy');
    clock.restore();
  }
});

test('default delay', function(assert) {
  assert.expect(4);

  assert.equal(obj.get('debouncedEmail'), 'initial value', "the initial value of `debouncedEmail` is the same as the `email`'s.");

  obj.set('email', 'hello@example.com');

  assert.equal(obj.get('debouncedEmail'), 'initial value', "`debouncedEmail` isn't updated immediately.");

  clock.tick(900);
  assert.equal(obj.get('debouncedEmail'), 'initial value', "`debouncedEmail` isn't updated before 1000ms passed.");

  clock.tick(100);
  assert.equal(obj.get('debouncedEmail'), 'hello@example.com', "`debouncedEmail` is updated after 1000ms passed.");
});

test('custom delay', function(assert) {
  assert.expect(2);

  obj.set('emailDelay', 1500);
  obj.set('email', 'hello@example.com');

  clock.tick(1400);
  assert.equal(obj.get('debouncedEmail'), 'initial value', "`debouncedEmail` isn't updated before 1500ms passed.");

  clock.tick(100);
  assert.equal(obj.get('debouncedEmail'), 'hello@example.com', "`debouncedEmail` is updated after 1500ms passed.");
});
