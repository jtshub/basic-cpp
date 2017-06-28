'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

const files = ['foobar/CMakeLists.txt',
  'foobar/src/main.cpp',
  'foobar/.vscode/launch.json',
  'foobar/.vscode/tasks.json',
  'foobar/.vscode/c_cpp_properties.json'];

describe('basic-cpp:app no arguments, default options', () => {
  beforeEach(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({name: 'foobar',
        projectDir: true,
        setupVSC: true,
        cpp11: true});
  });

  it('creates files', () => {
    assert.file(files);
  });

  it('creates correct file content', () => {
    assert.fileContent('foobar/CMakeLists.txt', 'project("foobar")');
    assert.fileContent('foobar/CMakeLists.txt', 'add_executable("foobar"');
    assert.fileContent('foobar/.vscode/launch.json', '"name": "foobar"');
    // Assert.fileContent('foobar/.vscode/launch.json', '/bin/<%= appname %>"');
  });
});

describe('basic-cpp:app with project argument', () => {
  beforeEach(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['fooblah'])
      .withPrompts({projectDir: true,
        setupVSC: true,
        cpp11: true});
  });

  it('creates files', () => {
    assert.file(files);
  });

  it('creates correct file content', () => {
    assert.fileContent('fooblah/CMakeLists.txt', 'project("fooblah")');
    assert.fileContent('fooblah/CMakeLists.txt', 'add_executable("fooblah"');
    assert.fileContent('fooblah/.vscode/launch.json', '"name": "fooblah"');
    // Assert.fileContent('foobar/.vscode/launch.json', '/bin/<%= appname %>"');
  });
});
