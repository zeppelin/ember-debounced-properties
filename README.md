# Ember CLI Debounced Properties Mixin

Creates debounced (delayed) versions of properties listed in the `debouncedProperties`
array. For each of these properties, a `debounced*` version is created with a
default delay of 1000ms. You can override this by defining `*Delay`.

Useful when you want to delay a property update, for example when the user types
into an input box, and you don't want to initiate a network- or CPU-intensive
operation, such as an HTTP request.


## Example

```javascript
// components/gravatar-image.js

import DebouncedPropertiesMixin from 'app-name/mixins/debounced-properties';

export default Ember.Component.extend(DebouncedPropertiesMixin, {
  tagName: 'img',
  attributeBindings: ['src'],

  debouncedProperties: ['email'],
  emailDelay: 2000, // optional, 1000ms by default

  src: Ember.computed.alias('gravatarUrl'),
  gravatarUrl: function() {
    return '//www.gravatar.com/avatar/'+md5(this.get('email'));
  }.property('debouncedEmail')
});
```

```handlebars
{{gravatar-image email='hello@example.com'}}
```
