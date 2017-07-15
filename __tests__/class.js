'use strict';
var path = require('path');
var helpers = require('yeoman-test');
// Var assert = require('yeoman-assert');

describe('basic-cpp:class', () => {
  beforeAll(() => {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({doNotMake: true})
      .withPrompts({name: 'foobar',
        projectDir: true,
        setupVSC: true,
        cpp11: true});
    return helpers.run(path.join(__dirname, '../generators/class'))
      .withArguments(['fooClass'])
      .withPrompts({regenMake: false});
  });

  it('creates class files', () => {
    return undefined;
  });
  return true;
});

