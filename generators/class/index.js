'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const fs = require('fs');

const CMAKETXT = 'CMakeLists.txt';
const CMAKECMD = 'cmake';

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.argument('className', {type: String, require: true});
  }

  prompting() {
    let prompts = [];

    prompts.push({
      type: 'confirm',
      name: 'regenMake',
      message: 'Regenerate makefile to include new class ' + chalk.yellow(this.args[0]) + '?',
      default: 'Y'
    });

    return this.prompt(prompts).then(answers => {
      this.options.regenMake = answers.regenMake;
    });
  }

  writing() {
    var dest = this.config.get('projectDirName') + '/';

    this.fs.copyTpl(
        this.templatePath('_class.h'),
        this.destinationPath(dest + 'include/' + this.args[0] + '.h'), {
          className: this.args[0]
        }
    );

    this.fs.copyTpl(
        this.templatePath('_class.cpp'),
        this.destinationPath(dest + 'src/' + this.args[0] + '.cpp'), {
          className: this.args[0]
        }
    );
  }

  install() {
    if (this.options.regenMake) {
      var cmakeCmdArg = '';
      if (this.config.get('projectDir') && fs.existsSync(this.config.get('projectDirName'))) {
        var pDir = this.config.get('projectDirName');
        if (fs.existsSync(pDir)) {
          cmakeCmdArg = pDir + '/' + CMAKETXT;
        }
      } else {
        cmakeCmdArg = CMAKETXT;
      }

      if (cmakeCmdArg === '') {
        this.log(chalk.red('Unable to regenerate makefile, project directory does not exist.'));
      } else {
        this.spawnCommandSync(CMAKECMD, [cmakeCmdArg]);
      }
    }
  }

  end() {
    this.log('created class ' + chalk.yellow(this.args[0]));
    if (this.options.regenMake) {
      this.log('regenerated makefile');
    } else {
      this.log('did not regnerate makefile as specified');
    }
  }
};
