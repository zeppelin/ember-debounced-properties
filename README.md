# Ember Debounced Properties Mixin

Creates debounced (delayed) versions of properties listed in the `debouncedProperties`
array. For each of these properties, a `debounced<property-name>` version is created with a
default delay of 1000ms. You can override this by defining `<property-name>Delay`.

Useful when you want to delay a property update, for example when the user types
into an input box, and you don't want to initiate a network- or CPU-intensive
operation, such as an HTTP request until the user didn't finish typing.


## Installation

$ npm install ember-debounced-properties --save-dev


## Example

```javascript
// components/gravatar-image.js

import DebouncedPropertiesMixin from 'ember-debounced-properties/mixin';
var computed = Ember.computed;
var alias = Ember.computed.alias;

export default Ember.Component.extend(DebouncedPropertiesMixin, {
  tagName: 'img',
  attributeBindings: ['src'],

  debouncedProperties: ['email'],
  emailDelay: 2000, // optional, 1000ms by default

  src: alias('gravatarUrl'),
  gravatarUrl: computed('debouncedEmail', function() {
    return '//www.gravatar.com/avatar/'+md5(this.get('email'));
  })
});
```

```handlebars
{{gravatar-image email='hello@example.com'}}
```

## License

Copyright (c) 2014 Gabor Babicz ([MIT](LICENSE) License)
