import Ember from 'ember';
var Mixin = Ember.Mixin;
var defineProperty = Ember.defineProperty;
var debounce = Ember.run.debounce;
var capitalize = Ember.String.capitalize;


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
