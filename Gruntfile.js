// Generated on 2014-08-29 using generator-angular 0.9.5
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var path = require('path');

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app/client',
    dist: 'dist',
    client: 'app/client',
    server: 'app/server/server.js'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        // ignore: ['node_modules/*','bower_components']
      },
      all: {
        src: [
          'Gruntfile.js',
          'app/**/*.js',
          '!**/*Spec.js'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      options: {
        cwd: '<%= yeoman.app %>'
      },
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      sass: {
        src: ['**/*.{scss,sass}']
        // ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    nodemon: {
      server: {
        script: 'app/server/server.js',
        options: {
          env: {
            PORT: '7432'
          },
          ignore: ['node_modules/**','bower_components/**'],
        }
      }
    },
  });

  grunt.registerTask('lint', [
    'newer:jshint'
  ]);

  grunt.registerTask('test', [
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'wiredep',
    'autoprefixer',
  ]);

  grunt.registerTask('serve', [
    'startPostgres',
    'nodemon:server',
  ]);

  grunt.registerTask('default', [
    'lint',
    // 'test',
    // 'build',
    'serve'
  ]);
};
