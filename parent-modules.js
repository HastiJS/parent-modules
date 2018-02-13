/*
 * Parent modules.
 *
 * Returns all parent modules, including container module.
 */

'use strict';

/*
 * Load Node.js modules.
 */
const path = require('path');

/**
 * Return parent modules.
 *
 * @param {Object} options -Options for result filter. Acceptable keys are 'type', 'find', 'indexes' and 'indexRange'.
 * @returns {Array} -Array of parent modules data.
 */
module.exports = (options) => {
  // Get all loaded modules.
  let modulesObject = module;

  // Sanitize `options` data level by level.
  let defaultOptions = {
    type: null,
    find: null,
    indexes: null,
    indexRange: [null, null]
  };
  // `options`
  options = options && typeof options === 'object' && options.constructor === Object ? Object.assign(defaultOptions, options) : defaultOptions;

  // `options.indexes`
  if (options.indexes && (!Array.isArray(options.indexes) || options.indexes.filter((index) => { return !Number.isInteger(index) || index < 0; }).length > 0)) {
    throw new Error(`'options.indexes' must be an array of not negative numbers.`);
  }
  if (Array.isArray(options.indexes)) {
    options.indexes.sort();
  }

  // `options.indexRange`
  if (!Array.isArray(options.indexRange) || options.indexRange.length !== 2) {
    throw new Error(`'options.indexeRange' must be an array with two values as start and end of range.`);
  }
  if ((options.indexRange[0] && (!Number.isInteger(options.indexRange[0] || options.indexRange[0] < 0))) || (!options.indexRange[0] && options.indexRange[1])) {
    throw new Error(`Start of range in 'options.indexeRange' must be a not negative number.`);
  }
  if (options.indexRange[1] && (!Number.isInteger(options.indexRange[0] || options.indexRange[0] < 0))) {
    throw new Error(`End of range in 'options.indexeRange' must be a not negative number or null for infinite end.`);
  }
  if (options.indexRange[0] && options.indexRange[1] && options.indexRange[0] > options.indexRange[1]) {
    throw new Error(`Starting number can not be more than ending number in 'options.indexeRange'.`);
  }

  // Fetch all parents from `module`.
  let parents = [];
  let parentCount = 1;
  let index = 0;
  do {
    let moduleId = modulesObject.parent.filename;
    let moduleName = path.basename(moduleId).replace(/\.js$/, '');
    let getModuleId = true;
    let getModuleName = true;
    if (options.find) {
      if (moduleId.search(options.find) === -1) {
        getModuleId = false;
      }
      if (moduleName.search(options.find) === -1) {
        getModuleName = false;
      }
    }
    if (options.indexes && options.indexes.indexOf(index) < 0) {
      getModuleId = false;
      getModuleName = false;
    }
    if (options.indexRange[0] !== null && index < options.indexRange[0]) {
      getModuleId = false;
      getModuleName = false;
    }

    switch (options.type) {
      case 'names':
        if (getModuleName) {
          parents.push(moduleName);
        }
        break;
      case 'complex':
        if (getModuleId || getModuleName) {
          parents[moduleName] = moduleId;
        }
        break;
      default:
        if (getModuleId) {
          parents.push(moduleId);
        }
    }
    if ((options.indexes && options.indexes[options.indexes.length - 1] === index) || (options.indexRange[1] !== null && index === options.indexRange[1])) {
      return parents;
    }
    ++index;
    modulesObject = modulesObject.parent;
    if (modulesObject.parent) {
      ++parentCount;
    }
    --parentCount;
  } while (parentCount > 0);

  return parents;
};
