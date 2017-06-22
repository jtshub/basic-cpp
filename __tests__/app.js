'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('basic-cpp:app no arguments', () => {
  beforeEach(() => {
    console.log(__dirname);
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({appname: 'foobar',
        projectDir: 'foobar',
        cpp11: true
      });
  });

  it('created and CD into a folder named like the app', () => {
    console.log(path.basename(process.cwd()));
    assert.equal(path.basename(__dirname, 'foobar'));
  });

  it('creates files', function () {
    assert.file('foobar/src/main.cpp');
  });
});
