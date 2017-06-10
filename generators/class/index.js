'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.argument('className', {type: String, require: true});
  }

  prompting() {
    this.log('generating class ' + chalk.red(this.args[0]));
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
};
