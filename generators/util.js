'use strict';

const fs = require('fs');
const chalk = require('chalk');

const CMAKETXT = 'CMakeLists.txt';
const CMAKECMD = 'cmake';

exports.cmake = function (spawn, pDir) {
  var cmakeCmdArg = '';
  if (pDir && fs.existsSync(pDir)) {
    cmakeCmdArg = pDir + '/' + CMAKETXT;
  } else {
    cmakeCmdArg = CMAKETXT;
  }

  if (cmakeCmdArg === '') {
    this.log(chalk.red('Unable to regenerate makefile, project directory does not exist.'));
  } else {
    return spawn(CMAKECMD, [cmakeCmdArg]);
  }
};

