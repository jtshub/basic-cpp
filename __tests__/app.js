'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('basic-cpp:app no arguments, default options', () => {
  beforeEach(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({doNotMake: true})
      .withPrompts({name: 'foobar',
        projectDir: true,
        setupVSC: true,
        cpp11: true});
  });

  const files = ['foobar/CMakeLists.txt',
    'foobar/src/main.cpp',
    'foobar/.vscode/launch.json',
    'foobar/.vscode/tasks.json',
    'foobar/.vscode/c_cpp_properties.json'];

  it('creates files', () => {
    assert.file(files);
  });

  it('creates correct file content', () => {
    assert.fileContent('foobar/CMakeLists.txt', 'project("foobar")');
    assert.fileContent('foobar/CMakeLists.txt', 'add_executable("foobar"');
    assert.fileContent('foobar/CMakeLists.txt', 'set (use11 "ON")');
    assert.fileContent('foobar/.vscode/launch.json', '"name": "foobar"');
    assert.fileContent('foobar/.vscode/launch.json', '/bin/foobar"');
  });
});

describe('basic-cpp:app with project argument', () => {
  beforeEach(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['fooblah'])
      .withOptions({doNotMake: true})
      .withPrompts({projectDir: true,
        setupVSC: true,
        cpp11: true});
  });

  const files = ['fooblah/CMakeLists.txt',
    'fooblah/src/main.cpp',
    'fooblah/.vscode/launch.json',
    'fooblah/.vscode/tasks.json',
    'fooblah/.vscode/c_cpp_properties.json'];

  it('creates files', () => {
    assert.file(files);
  });

  it('creates correct file content', () => {
    assert.fileContent('fooblah/CMakeLists.txt', 'project("fooblah")');
    assert.fileContent('fooblah/CMakeLists.txt', 'add_executable("fooblah"');
    assert.fileContent('fooblah/CMakeLists.txt', 'set (use11 "ON")');
    assert.fileContent('fooblah/.vscode/launch.json', '"name": "fooblah"');
    assert.fileContent('fooblah/.vscode/launch.json', '/bin/fooblah"');
  });
});

describe('basic-cpp:app without project directory', () => {
  beforeEach(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['fooNoProj'])
      .withOptions({doNotMake: true})
      .withPrompts({projectDir: false,
        setupVSC: true,
        cpp11: true
      });
  });

  const files = ['CMakeLists.txt',
    'src/main.cpp',
    '.vscode/launch.json',
    '.vscode/tasks.json',
    '.vscode/c_cpp_properties.json'];

  it('creates files', () => {
    assert.file(files);
  });

  it('creates correct file content', () => {
    assert.fileContent('CMakeLists.txt', 'project("fooNoProj")');
    assert.fileContent('CMakeLists.txt', 'add_executable("fooNoProj"');
    assert.fileContent('CMakeLists.txt', 'set (use11 "ON")');
    assert.fileContent('.vscode/launch.json', '"name": "fooNoProj"');
    assert.fileContent('.vscode/launch.json', '/bin/fooNoProj"');
  });
});

describe('basic-cpp:app no vscode settings', () => {
  beforeEach(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['fooNoVsCode'])
      .withOptions({doNotMake: true})
      .withPrompts({projectDir: true,
        setupVSC: false,
        cpp11: true
      });
  });

  const files = ['fooNoVsCode/CMakeLists.txt',
    'fooNoVsCode/src/main.cpp'];

  const noFiles = ['fooNoVsCode/.vscode/launch.json',
    'fooNoVsCode/.vscode/tasks.json',
    'fooNoVsCode/.vscode/c_cpp_properties.json'];

  it('creates files', () => {
    assert.file(files);
  });

  it('does not create files', () => {
    assert.noFile(noFiles);
  });

  it('creates correct file content', () => {
    assert.fileContent('fooNoVsCode/CMakeLists.txt', 'project("fooNoVsCode")');
    assert.fileContent('fooNoVsCode/CMakeLists.txt', 'add_executable("fooNoVsCode"');
    assert.fileContent('fooNoVsCode/CMakeLists.txt', 'set (use11 "ON")');
  });
});

describe('basic-cpp:app not using c++11 compiler flag', () => {
  beforeEach(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['fooNo11Flag'])
      .withOptions({doNotMake: true})
      .withPrompts({projectDir: true,
        setupVSC: true,
        cpp11: false
      });
  });

  const files = ['fooNo11Flag/CMakeLists.txt',
    'fooNo11Flag/src/main.cpp',
    'fooNo11Flag/.vscode/launch.json',
    'fooNo11Flag/.vscode/tasks.json',
    'fooNo11Flag/.vscode/c_cpp_properties.json'];

  it('creates files', () => {
    assert.file(files);
  });

  it('creates correct file content', () => {
    assert.fileContent('fooNo11Flag/CMakeLists.txt', 'project("fooNo11Flag")');
    assert.fileContent('fooNo11Flag/CMakeLists.txt', 'add_executable("fooNo11Flag"');
    assert.fileContent('fooNo11Flag/CMakeLists.txt', 'set (use11 "OFF")');
    assert.fileContent('fooNo11Flag/.vscode/launch.json', '"name": "fooNo11Flag"');
    assert.fileContent('fooNo11Flag/.vscode/launch.json', '/bin/fooNo11Flag"');
  });
});
