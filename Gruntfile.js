module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'public/client/app.js',
          'public/client/link.js',
          'public/client/links.js',
          'public/client/linkView.js',
          'public/client/linksView.js',
          'public/client/createLinkView.js',
          'public/client/router.js'
        ],
        dest: 'public/dist/app-concat.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      // UGLIFY ME
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'public/dist/app-min.js': ['public/dist/app-concat.js'],
        }
      }
    },

    jshint: {
      files: [
        'public/client/app.js',
        'public/client/link.js',
        'public/client/links.js',
        'public/client/linkView.js',
        'public/client/linksView.js',
        'public/client/createLinkView.js',
        'public/client/router.js',
        'app/**/*.js',
        'app/config.js',
        'lib/*.js',
        'server-config.js',
        'server.js'
      ],
      options: {
        // force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js'
        ]
      }
    },

    cssmin: {
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      options: {
        stdout: true
      },
      prodServer: {
        command: function(){
          return 'git push azure master';
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'jshint',
    'mochaTest',
    'concat',
    'uglify',
    'shell'
  ]);

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      // add your production server task here
      grunt.task.run(['build']);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
    'jshint',
    'mochaTest',
    'concat',
    'uglify'
  ]);
};
