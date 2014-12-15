import Ember from 'ember';
import DebouncedPropertiesMixin from 'ember-debounced-properties/mixin';
var Component = Ember.Component;

export default Component.extend(DebouncedPropertiesMixin, {
  debouncedProperties: ['value']
});
