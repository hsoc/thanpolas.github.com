/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */

/**
 * [exports description]
 * @param  {[type]} grunt [description]
 * @return {[type]}       [description]
 */
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Project configuration.
  grunt.initConfig({
    watch: {
      less: {
        files: ['assets/themes/thanpolas/less/*.less'],
        tasks: 'lessCopy'
      },
      jekyllSources: {
        files: [
          // capture all except css
          '*.html', '*.yml', 'assets/js/**.js', '_posts/**',
          'projects/**', 'blog/**', 'about/**', '_includes/**',
          'atom.xml'
          ],
        tasks: 'shell:jekyll',
        options: {
          //forceWatchMethod: 'old',
          //debounceDelay: 500
        }
      }
    },
    copy: {
      dist: {
        files: {
          '_site_git/' : '_site/**'
        }
      },
      css : {
        files: {
          '_site/assets/themes/thanpolas/css/tpstyle.css': 'assets/themes/thanpolas/css/tpstyle.css'
        }
      }
    },
  shell: {
      jekyll: {
          command: 'rm -rf _site/*; jekyll',
          stdout: true
      }
  },
  less: {
    development: {
      options: {
        paths: ['assets/themes/thanpolas/less']
      },
      files: {
        'assets/themes/thanpolas/css/tpstyle.css': 'assets/themes/thanpolas/less/main.less'
      }
    }
  }


  });

  // less watch
  grunt.registerTask('lessCopy', 'less:development copy:css');
  // Default task.
  grunt.registerTask('default', 'watch');

};
