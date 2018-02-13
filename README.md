# Parent Modules

> Get all parent modules

Useful when you want to get all parent modules including the module which our script lives in.

## Install

```
$ npm install parent-modules --save
```

## Usage

In all examples bellow, 'module-one' executed.

### Get parents IDs

```js
// module-two.js (path: /home/hastijs/module-two.js)
const parentModules = require('parent-modules');
console.log(parentModules());
```

```js
// module-one.js (path: /home/hastijs/module-one.js)
require('./module-two');
//=> [ '/home/hastijs/module-two.js', '/home/hastijs/module-one.js' ]
```

### Get parents names

```js
// module-two.js (path: /home/hastijs/module-two.js)
const parentModules = require('parent-modules');
const options = {type: 'names'};
console.log(parentModules(options));
```

```js
// module-one.js (path: /home/hastijs/module-one.js)
require('./module-two');
//=> [ 'module-tow', 'module-one' ]
```

### Get parents names by index

```js
// module-three.js (path: /home/hastijs/module-three.js)
const parentModules = require('parent-modules');
const options = {type: 'names', indexes: [0, 2]};
console.log(parentModules(options));
```

```js
// module-two.js (path: /home/hastijs/module-tow.js)
module.exports = require('./module-three');
```

```js
// module-one.js (path: /home/hastijs/module-one.js)
require('./module-two');
//=> [ 'module-three', 'module-one' ]
```

### Search and get parents names into an index range

```js
// module-three.js (path: /home/hastijs/module-three.js)
const parentModules = require('parent-modules');
const options = {type: 'names', find: /module-t/, indexRange: [1, 2]};
console.log(parentModules(options));
```

```js
// module-two.js (path: /home/hastijs/module-tow.js)
module.exports = require('./module-three');
```

```js
// module-one.js (path: /home/hastijs/module-one.js)
require('./module-two');
//=> [ 'module-two' ]
```

## API

### parentModules(options)

#### options

Type: `object`

Options to filter result (parent modules).

##### type

Type: `string`

Default: `ids`

You can use `ids`, `names` and `complex`.

##### find

Type: `string` | `object`

Search the result using a string or RegExp.

##### indexes

Type: `array`

List of parent module indexes which we want to get.

##### indexRange

Type: `array`

Range of parent module indexes which we want to get.

## Contributing

Everyone is very welcome to contribute to Parent Modules project. Parent Modules is a HastiJS project so please see [HastiJS contributing guidelines](https://github.com/HastiJS/contributing) before contributing.

## License

MIT © [HastiJS](https://github.com/HastiJS)
