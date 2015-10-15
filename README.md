# Ember Debounced Properties Mixin [![Build Status](https://travis-ci.org/zeppelin/ember-debounced-properties.svg)](https://travis-ci.org/zeppelin/ember-debounced-properties) [![Ember Observer Score](http://emberobserver.com/badges/ember-debounced-properties.svg)](http://emberobserver.com/addons/ember-debounced-properties)

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

## Experimental ES7 decorator syntax

Inspired by [@rwjblue](https://github.com/rwjblue)'s awesome [ember-computed-decorators](https://github.com/rwjblue/ember-computed-decorators), it is possible to use the ES7 decorator syntax to define debounced properties without using the mixin. All you have to do is just put a decorator over the property you want to have a debounced version. It can be a regular or a computed property, both will work.

```js
import Ember from 'ember';
import debounced from 'ember-debounced-properties/decorator';

export default Ember.Component.extend({
  firstName: 'John',
  lastName: 'Doe',

  @debounced(2000)
  fullName: Ember.computed('firstName', 'lastName', function() {
    return `${firstName} ${lastName}`;
  })
});
```

The result is the same as with the mixin: both `debouncedFullName` and `fullNameDelay` are accessible on the object. For convenience, the delay can be set from the decorator, but the if `fullNameDelay` exist, it will have precedence, since it could be set at runtime as well. When you call the decorator without arguments (just `@decorator`), the default 1000ms delay will be used.

### Usage

Refer to `ember-computed-decorators`' [Babel Setup](https://github.com/rwjblue/ember-computed-decorators#babel-setup) chapter.

### One More Thing&trade;

It is, of course, could be used together with `ember-computed-decorators`!

```js
@debounced
@computed('firstName', 'lastName')
fullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}
``` 

## Contributing

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).


## License

Copyright (c) 2014 Gabor Babicz ([MIT](LICENSE) License)
