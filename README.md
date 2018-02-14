# Parent Modules

> Get all parent modules

Useful when you want to get all parent modules including the module which your script lives in.

## Install

```
$ npm install parent-modules --save
```

## Know more

Assume that we have three nested modules into `/home/hastijs` directory. That means we require module three into module two and module two into module one.

```
/home/hastijs/
|_ module-one.js
   |_ module-two.js
      |_ module-three.js
```

Now we run `module-one` while `parent-modules` called into  `module-three`.

```js
// module-three.js
console.log(require('parent-modules')());
```

The result is:

```js
//=> [ '/home/hastijs/module-three.js', '/home/hastijs/module-two.js', '/home/hastijs/module-one.js' ]
```

## Usage

In all examples bellow, **module-one** executed.

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
require('./module-three');
```

```js
// module-one.js (path: /home/hastijs/module-one.js)
require('./module-two');
//=> [ 'module-three', 'module-one' ]
```

### Search and get parents name->id (complex) into an index range

```js
// module-three.js (path: /home/hastijs/module-three.js)
const parentModules = require('parent-modules');
const options = {type: 'complex', find: /module-t/, indexRange: [1, 2]};
console.log(parentModules(options));
```

```js
// module-two.js (path: /home/hastijs/module-tow.js)
require('./module-three');
```

```js
// module-one.js (path: /home/hastijs/module-one.js)
require('./module-two');
//=> [ 'module-two': '/home/hastijs/module-tow.js' ]
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
