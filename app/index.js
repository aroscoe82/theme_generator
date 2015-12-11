var mkdirp = require('mkdirp');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  prompting: function () {
    var done = this.async();
    this.prompt([
    {
      type    : 'input',
      name    : 'themeName',
      message : 'Your theme name (no spaces)',
      store   : true,
      default : this.appname // Default to current folder name
    },{
      type    : 'input',
      name    : 'customerName',
      message : 'Customer for theme',
      store   : true,
      default : this.appname // Default to current folder name
    }], function (answers) {
      this.log(answers.customerName + ': ' + answers.themeName);
      this.themeName = answers.themeName;
      this.customerName = answers.customerName;
      done();
    }.bind(this));
  },
  paths: function () {
    this.sourceRoot(); // returns './templates'
    this.templatePath('index.js'); // returns './templates/index.js'
  },
  scaffoldFolders: function(){
      mkdirp.sync(this.themeName);
      mkdirp.sync(this.themeName + "/css");
      mkdirp.sync(this.themeName + "/includes");
      mkdirp.sync(this.themeName + "/sass");
      mkdirp.sync(this.themeName + "/template-parts");
      mkdirp.sync(this.themeName + "/templates");
  },
  writing: function () {
    // copy root files
    this.fs.copyTpl(
      this.templatePath('.*'),
      this.destinationPath(this.themeName),
      { title: this.themeName,
        customer: this.customerName }
    );

    // copy template-parts files
    this.fs.copyTpl(
      this.templatePath('template-parts/*.*'),
      this.destinationPath(this.themeName + '/template-parts'),
      { title: this.themeName,
        customer: this.customerName }
    );

    // copy css files
    this.fs.copyTpl(
      this.templatePath('css/*.css'),
      this.destinationPath(this.themeName + '/css'),
      { title: this.themeName,
        customer: this.customerName }
    );

    // copy sass files
    this.fs.copyTpl(
      this.templatePath('sass/*.scss'),
      this.destinationPath(this.themeName + '/sass'),
      { title: this.themeName,
        customer: this.customerName }
    );

    // copy includes files
    this.fs.copyTpl(
      this.templatePath('includes/*.*'),
      this.destinationPath(this.themeName + '/sass'),
      { title: this.themeName,
        customer: this.customerName }
    );
  }
});
