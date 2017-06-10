'use strict';
var assert = require('yeomen-assert');

describe('generator-basic-cpp:class', () => {
  it('creates class files', () => {
    assert.file([
      'include/class.h',
      'src/class.cpp'
    ]);
  });
});

