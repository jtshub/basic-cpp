'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const util = require('../util');

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
        this.destinationPath(dest + 'inc/' + this.args[0] + '.h'), {
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
      util.cmake(this.spawnCommandSync, this.config.get('projectDirName'));
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
