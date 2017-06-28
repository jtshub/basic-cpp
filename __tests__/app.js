'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('basic-cpp:app no arguments', () => {
  beforeEach(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({name: 'foobar',
        projectDir: true,
        setupVSC: true,
        cpp11: true});
  });

  it('creates files', function () {
    assert.file('foobar/src/main.cpp');
  });
});
