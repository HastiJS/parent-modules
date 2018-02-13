/*
 * Parent modules test.
 */

'use strict';

const path = require('path');
const assert = require('assert');
const parentsOfModuleThree = require('../example/module-one');

/*
 * Start testing.
 */
describe('parent-modules', () => {
  describe(`'option.find'`, () => {
    it(`Should return an array with id of 'module-one'`, () => {
      const options = {
        find: /-one\.js$/
      };
      const parents = parentsOfModuleThree(options);
      assert.equal(parents.length, 1);
      assert.equal(parents[0], path.resolve(__dirname, '../example/module-one.js'));
    });
  });
  describe(`'option.indexes'`, () => {
    it(`Should return an array with id of 'module-two'`, () => {
      const options = {
        indexes: [1]
      };
      const parents = parentsOfModuleThree(options);
      assert.equal(parents.length, 1);
      assert.equal(parents[0], path.resolve(__dirname, '../example/module-two.js'));
    });
  });
  describe(`'option.indexRange'`, () => {
    it(`Should return an array with id of 'module-two'`, () => {
      const options = {
        indexRange: [1, 1]
      };
      const parents = parentsOfModuleThree(options);
      assert.equal(parents.length, 1);
      assert.equal(parents[0], path.resolve(__dirname, '../example/module-two.js'));
    });
  });
  describe(`'option.indexRange'`, () => {
    it(`Should return an array with id of modules that are parent of 'module-tow'`, () => {
      const options = {
        indexRange: [2, null]
      };
      const parents = parentsOfModuleThree(options);
      assert(parents.length > 2);
      assert.equal(parents[0], path.resolve(__dirname, '../example/module-one.js'));
    });
  });
  describe(`'option.names'`, () => {
    it(`Should return an array containing name of 'module-three' as first entry`, () => {
      const options = {
        type: 'names'
      };
      const parents = parentsOfModuleThree(options);
      assert.equal(parents[0], 'module-three');
    });
  });
});
