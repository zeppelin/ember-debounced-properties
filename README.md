# Ember Debounced Properties Mixin [![Build Status](https://travis-ci.org/zeppelin/ember-debounced-properties.svg)](https://travis-ci.org/zeppelin/ember-debounced-properties)

Creates debounced (delayed) versions of properties listed in the `debouncedProperties`
array. For each of these properties, a `debounced<property-name>` version is created with a
default delay of 1000ms. You can override this by defining `<property-name>Delay`.

Useful when you want to delay a property update, for example when the user types
into an input box, and you don't want to initiate a network- or CPU-intensive
operation, such as an HTTP request until the user didn't finish typing.


## Installation

```
$ npm install ember-debounced-properties --save-dev
```

## Usage

1. Extend your `Ember.Object` (such as an `Ember.Component`) with the mixin.
    ```js
    import Ember from 'ember';
    import DebouncedPropertiesMixin from 'ember-debounced-properties/mixin';
      
    export default Ember.Component.extend(DebouncedPropertiesMixin, {
      debouncedProperties: ['value']
    });
    ```

2. Use `debouncedValue` inside the component's template
    ```hbs
    <h2>{{debouncedValue}}</h2>
    ```

3. `debouncedValue` will follow `value` after a short delay. You can set the delay with `valueDelay`.
    ```hbs
    {{input value=value}} <- after you done typing it will appear 1.5 seconds later below
    {{my-component value=value valueDelay=1500}}
    ```


## Gravatar Example

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
