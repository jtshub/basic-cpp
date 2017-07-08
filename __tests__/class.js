'use strict';
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('basic-cpp:class', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/class'))
      .withArguments(['fooClass'])
      .withPrompts({regenMake: false});
  });

  it('creates class files', () => {
    assert.file([
      'foo/inc/fooClass.h',
      'foo/src/fooClass.cpp'
    ]);
  });
});

