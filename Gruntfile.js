// Generated on 2014-08-29 using generator-angular 0.9.5
'use strict';

var path = require('path');

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
      },
      all: {
        src: [
          'Gruntfile.js',
          'app/**/*.js',
          '!**/*Spec.js'
        ]
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

  grunt.registerTask('build', [
  ]);

  grunt.registerTask('test', [
    'karma'
  ]);

  grunt.registerTask('serve', [
    'startPostgres',
    'nodemon:server',
  ]);

  grunt.registerTask('default', [
    'lint',
    'build',
    'test',
    'serve'
  ]);
};
