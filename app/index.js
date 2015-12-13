var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var _s = require('underscore.string');

module.exports = generators.Base.extend({
  prompting: function () {
    var done = this.async();
    this.prompt([{
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
    },{
      type: 'confirm',
      name: 'gruntInclude',
      message: 'Would you like to use Grunt?',
      store: true,
      default: true
    }, {
      when: function (response) {
        return response.gruntInclude;
      },

      type: 'checkbox',
      name: 'gruntOptions',
      message: 'Great! What would you like to include?',
      store: true,
      choices: [{
          name: 'Grunt Sass',
          value: 'gruntSass',
          checked: false
        },{
          name: 'Grunt Autoprefixer',
          value: 'gruntAutoPrefix',
          checked: false
      }]
    },{
      type: 'confirm',
      name: 'bootstrapInclude',
      message: 'Would you like to use Bootstrap?',
      store: true,
      default: true
    }, {
      when: function (response){
        return response.bootstrapInclude;
      },

      type: 'list',
      name: 'bootstrapType',
      message: 'In what format would you like the Bootstrap stylesheets?',
      choices: ['css', 'sass'],
      store: true,
      default: 'css'
    }], function (answers) {
      //console.log(chalk.inverse('*******************************'));
      this.themeName = answers.themeName.replace(/ /g, '_').toLowerCase();
      this.customerName = answers.customerName;
      // this.log(this.customerName + ': ' + this.themeName + '_theme');

      this.gruntInclude = answers.gruntInclude;
      // this.log('Include Grunt: ' + this.gruntInclude);

      function hasGruntOption(feat) {
        return answers.gruntOptions.indexOf(feat) !== -1;
      }

      if(this.gruntInclude){
        this.gruntSass = hasGruntOption('gruntSass');
        // this.log('Grunt Option Sass: ' + this.gruntSass);

        this.gruntPrefix = hasGruntOption('gruntAutoPrefix');
        // this.log('Grunt Option Autoprefixer: ' + this.gruntPrefix);
      }

      this.bootstrapInclude = answers.bootstrapInclude;
      // this.log('Inlucde Bootstrap: ' + this.bootstrapInclude);

      if(this.bootstrapInclude){
        this.bootstrapType = answers.bootstrapType;
        // this.log('Boostrap style type: ' + this.bootstrapType);
      }
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
  scaffoldFiles: function () {
    // copy root php files
    this.fs.copyTpl(
      this.templatePath('*.php'),
      this.destinationPath(this.themeName),
      { title: this.themeName,
        customer: this.customerName }
    );

    // copy root css files
    this.fs.copyTpl(
      this.templatePath('*.css'),
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
  },
  generateGruntFile: function(){
    if (this.gruntInclude) {
      // console.log(chalk.red('generateGruntFile'));
      this.fs.copyTpl(
        this.templatePath('_GruntFile.js'),
        this.destinationPath(this.themeName + '/GruntFile.js'),
        { title: this.themeName,
          customer: this.customerName,
          sassInclude: this.gruntSass,
          prefixInclude: this.gruntPrefix}
      );
    }
  },
  bower: function(){
    // copy .bowerrc file
    this.fs.copyTpl(
      this.templatePath('_.bowerrc'),
      this.destinationPath(this.themeName + '/.bowerrc')
    );

    // create bower.json file
    var bowerJson = {
      name: _s.slugify(this.themeName),
      private: true,
      dependencies: {}
    };
    if(this.bootstrapInclude){
      if (this.bootstrapType == 'sass') {
        bowerJson.dependencies['bootstrap-sass'] = '~3.3.5';
        bowerJson.overrides = {
          'bootstrap-sass': {
            'main': [
              'assets/stylesheets/_bootstrap.scss',
              'assets/fonts/bootstrap/*',
              'assets/javascripts/bootstrap.js'
            ]
          }
        };
      } else if(this.bootstrapType == 'css') {
        bowerJson.dependencies['bootstrap'] = '~3.3.5';
        bowerJson.overrides = {
          'bootstrap': {
            'main': [
              'less/bootstrap.less',
              'dist/css/bootstrap.css',
              'dist/js/bootstrap.js',
              'dist/fonts/*'
            ]
          }
        };
      }
    }
    this.fs.writeJSON(this.themeName + '/bower.json', bowerJson);
  },
  npmSetup: function(){
    var packageJson = {
      name: _s.slugify(this.themeName),
      version: "1.0.0",
      description: "",
      author: "Amanda Roscoe",
      // scripts: {},
      dependencies: {},
      devDependencies: {}
    };

    packageJson.dependencies['bower'] =  '^1.4.1';
    // packageJson.scripts['bower'] = "bower";
    // packageJson.scripts['postinstall'] = "bower install";

    if(this.gruntInclude){
      // packageJson.scripts['grunt'] = "grunt";
      // packageJson.scripts['start'] = "grunt";

      // packageJson.scripts['prestart'] = "npm install, grunt build";
      packageJson.dependencies['grunt'] =  '^0.4.5';
      packageJson.dependencies['grunt-cli'] =  '^0.1.13';
      packageJson.dependencies['grunt-contrib-copy'] =  '^0.8.1';
      packageJson.dependencies['grunt-contrib-watch'] =  '^0.6.1';

      if(this.gruntSass){
        packageJson.dependencies['grunt-contrib-sass'] =  '^0.9.2';
      }
      if(this.gruntPrefix){
        packageJson.dependencies['grunt-autoprefixer'] =  '^3.0.3';
      }
    }else{
      // packageJson.scripts['prestart'] = "npm install";
    }

    this.fs.writeJSON(this.themeName + '/package.json', packageJson);
  },
  install: function () {
    // Change working directory to 'gulp' for dependency install
    var npmdir = process.cwd() + '/' + this.themeName;
    process.chdir(npmdir);

    //this.installDependencies(['--dev'], {npm: true, bower: true});
    // this.bowerInstall();
    // this.npmInstall()
  }
});
