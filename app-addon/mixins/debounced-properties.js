import Ember from 'ember';
var Mixin = Ember.Mixin;
var defineProperty = Ember.defineProperty;
var debounce = Ember.run.debounce;
var capitalize = Ember.String.capitalize;

/**
  Creates debounced versions of properties listed in the `debouncedProperties`
  array. For each of these properties, a `debounced*` version is created with a
  default delay of 1000ms. You can override this by defining `*Delay`.


  ## Example (Ember App Kit)

  ```javascript
  // components/gravatar-image.js

  import DebouncedPropertiesMixin from 'appkit/mixins/debounced-properties';

  export default Ember.Component.extend(DebouncedPropertiesMixin, {
    tagName: 'img',
    attributeBindings: ['src'],

    debouncedProperties: ['email'],
    emailDelay: 2000, // optional, 1000ms by default,

    src: Ember.computed.alias('gravatarUrl'),
    gravatarUrl: function() {
      return '//www.gravatar.com/avatar/'+md5(this.get('email'));
    }.property('debouncedEmail')
  });
  ```

  ```handlebars
  {{gravatar-image email='hello@example.com'}}
  ```
*/
export default Mixin.create({
  concatenatedProperties: ['debouncedProperties'],
  debouncedProperties: [],

  init: function() {
    this._super();

    var props = this.get('debouncedProperties');

    for (var i=0, len=props.length; i<len; i++) {
      var property = props[i];
      var setterName = 'setDebounced'+capitalize(property);
      var observerName = property+'DidChange';

      defineCallbackMethod(this, property, setterName);
      setupObserver(this, property, setterName, observerName);
      this.addObserver(property, this, this[observerName]);
    }
  }
});


function setupObserver(obj, property, setterName, observerName) {
  defineProperty(obj, observerName, undefined, function() {
    var delay = obj.getWithDefault(property+'Delay', 1000);

    if (delay > 0) {
      debounce(obj, obj[setterName], delay);
    } else {
      obj[setterName]();
    }
  });
}

function defineCallbackMethod(obj, property, setterName) {
  defineProperty(obj, setterName, undefined, function() {
    if (!this.isDestroying || !this.isDestroyed) {
      this.set('debounced'+capitalize(property), this.get(property));
    }
  });
}
