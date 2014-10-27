module.exports = function (grunt)
{
  'use strict';

  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  ,	buildcontrol: 'grunt-build-control'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    // Configurable paths
    yeoman: {
      app: 'app',
      dist: 'dist'
    }

  , watch: {
      compass: {
        files: ['<%= yeoman.app %>/styles/**/*.{scss,sass}']
      , tasks: ['compass:server', 'autoprefixer:server']
      }
    , autoprefixer: {
        files: ['<%= yeoman.app %>/styles/**/*.css']
      , tasks: ['copy:stageCss', 'autoprefixer:server']
      }
    , jekyll: {
        files: [
          '<%= yeoman.app %>/**/*.{html,yml,md,mkd,markdown}'
        , '!<%= yeoman.app %>/bower_components/**/*'
        ]
      , tasks: ['jekyll:server']
      }
    , livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      , files: [
          '.jekyll/**/*.html'
        , '.tmp/styles/**/*.css'
        , '{.tmp,<%= yeoman.app %>}/scripts/**/*.js'
        , '<%= yeoman.app %>/images/**/*.{gif,jpg,jpeg,png,svg,webp}'
        ]
      }
    }
  , connect: {
      options: {
        port: 9000
      , livereload: 35729
        // change this to '0.0.0.0' to access the server from outside
      , hostname: 'localhost'
      }
    , livereload: {
        options: {
          open: true
        , base: [
            '.tmp'
          , '.jekyll'
          , '<%= yeoman.app %>'
          ]
        }
      }
    , dist: {
        options: {
          open: true
        , base: ['<%= yeoman.dist %>']
        }
      },
      test: {
        options: {
          base: [
            '.tmp'
          , '.jekyll'
          , 'test'
          , '<%= yeoman.app %>'
          ]
        }
      }
    }
  , clean: {
      dist: {
        files: [{
          dot: true
        , src: [
            '<%= yeoman.dist %>/*'
            // Running Jekyll also cleans the target directory.  Exclude any
            // non-standard `keep_files` here (e.g., the generated files
            // directory from Jekyll Picture Tag).
          , '!<%= yeoman.dist %>/.git*'
          ]
        }]
      }
    , server: [
        '.tmp'
      , '.jekyll'
      ]
    }
  , compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles'
      ,	cssDir: '.tmp/styles'
      ,	generatedImagesDir: '.tmp/images/generated'
      ,	imagesDir: '<%= yeoman.app %>/images'
      ,	javascriptsDir: '<%= yeoman.app %>/scripts'
      ,	fontsDir: '<%= yeoman.app %>/fonts'
      ,	importPath: '<%= yeoman.app %>/bower_components'
      ,	httpImagesPath: '<%= yeoman.app %>/images'
      ,	httpGeneratedImagesPath: '<%= yeoman.app %>/images/generated'
      ,	httpFontsPath: '<%= yeoman.app %>/fonts'
      ,	relativeAssets: false
      ,	assetCacheBuster: false
      , outputStyle: 'compressed'
      }
    , dist: {
        files: [{
          expand: true
        , cwd: '<%= yeoman.app %>/styles'
        , src: '**/*.{scss,sass}'
        , dest: '.tmp/styles'
        , ext: '.css'
        }]
      }
    , server: {
        options: {
          debugInfo: true
        }
      , files: [{
          expand: true
        , cwd: '<%= yeoman.app %>/styles'
        , src: '**/*.{scss,sass}'
        , dest: '.tmp/styles'
        , ext: '.css'
        }]
      }
    }
  , autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      }
    , dist: {
        files: [{
          expand: true
        , cwd: '<%= yeoman.dist %>/styles'
        , src: '**/*.css'
        , dest: '<%= yeoman.dist %>/styles'
        }]
      }
    , server: {
        files: [{
          expand: true
        , cwd: '.tmp/styles'
        , src: '**/*.css'
        , dest: '.tmp/styles'
        }]
      }
    }
  , jekyll: {
      options: {
        bundleExec: true
      , config: '_config.yml,_config.build.yml'
      , src: '<%= yeoman.app %>'
      }
    , dist: {
        options: {
          dest: '<%= yeoman.dist %>'
        }
      }
    , server: {
        options: {
          config: '_config.yml'
        , dest: '.jekyll'
        }
      }
    , check: {
        options: {
          doctor: true
        }
      }
    }
  , useminPrepare: {
      options: {
        dest: '<%= yeoman.dist %>'
      }
    , html: '<%= yeoman.dist %>/index.html'
    }
  , usemin: {
      options: {
        assetsDirs: '<%= yeoman.dist %>'
      }
    , html: ['<%= yeoman.dist %>/**/*.html']
    , css: ['<%= yeoman.dist %>/styles/**/*.css']
    }
  , htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true
        , collapseBooleanAttributes: true
        , removeAttributeQuotes: true
        , removeRedundantAttributes: true
        }
      , files: [{
          expand: true
        , cwd: '<%= yeoman.dist %>'
        , src: '**/*.html'
        , dest: '<%= yeoman.dist %>'
        }]
      }
    }
    // Usemin adds files to concat
  , concat: {}
    // Usemin adds files to uglify
  , uglify: {}
    // Usemin adds files to cssmin
  , cssmin: {
      dist: {
        options: {
          check: 'gzip'
        }
      }
    }
  , imagemin: {
      dist: {
        options: {
          progressive: true
        }
      , files: [{
          expand: true
        , cwd: '<%= yeoman.dist %>'
        , src: '**/*.{jpg,jpeg,png}'
        , dest: '<%= yeoman.dist %>'
        }]
      }
    }
  , svgmin: {
      dist: {
        files: [{
          expand: true
        , cwd: '<%= yeoman.dist %>'
        , src: '**/*.svg'
        , dest: '<%= yeoman.dist %>'
        }]
      }
    }
  , copy: {
      dist: {
        files: [{
          expand: true
        , dot: true
        , cwd: '<%= yeoman.app %>'
        , src: [
            // Jekyll processes and moves HTML and text files.
            // Usemin moves CSS and javascript inside of Usemin blocks.
            // Copy moves asset files and directories.
            'images/**/*'
          , 'fonts/**/*'
            // Like Jekyll, exclude files & folders prefixed with an underscore.
          , '!**/_*{,/**}'
            // Explicitly add any files your site needs for distribution here.
            //'bower_components/jquery/jquery.js',
            //'favicon.ico',
            //'apple-touch*.png'
          ]
        , dest: '<%= yeoman.dist %>'
        }]
      }
      // Copy CSS into .tmp directory for Autoprefixer processing
    , stageCss: {
        files: [{
          expand: true
        , dot: true
        , cwd: '<%= yeoman.app %>/styles'
        , src: '**/*.css'
        , dest: '.tmp/styles'
        }]
      }
    }
  , filerev: {
      options: {
        length: 4
      }
    , dist: {
        files: [{
          src: [
            '<%= yeoman.dist %>/scripts/**/*.js'
          , '<%= yeoman.dist %>/styles/**/*.css'
          , '<%= yeoman.dist %>/images/**/*.{gif,jpg,jpeg,png,svg,webp}'
          , '<%= yeoman.dist %>/fonts/**/*.{eot*,otf,svg,ttf,woff}'
          ]
        }]
      }
    }
  , buildcontrol: {
      dist: {
        options: {
          remote: '../'
        , branch: 'gh-pages'
        , commit: true
        , push: true
        }
      }
    }
  , jshint: {
      options: {
        jshintrc: '.jshintrc'
      , reporter: require('jshint-stylish')
      }
    , all: [
        'Gruntfile.js'
      , '<%= yeoman.app %>/scripts/**/*.js'
      , 'test/spec/**/*.js'
      ]
    }
  , concurrent: {
      server: [
        'compass:server'
      , 'copy:stageCss'
      , 'jekyll:server'
      ]
    , dist: [
        'compass:dist'
      , 'copy:dist'
      ]
    }
  });

  // Define Tasks
  grunt.registerTask('serve', function (target)
  {
    if (target === 'dist')
      return grunt.task.run(['build', 'connect:dist:keepalive']);

    grunt.task.run([
      'clean:server'
    , 'concurrent:server'
    , 'autoprefixer:server'
    , 'connect:livereload'
    , 'watch'
    ]);
  });

  grunt.registerTask('check', [
    'clean:server'
  , 'jekyll:check'
  , 'compass:server'
  , 'jshint:all'
  ]);

  grunt.registerTask('build', [
    'clean'
  , 'jekyll:dist'
  , 'concurrent:dist'
  , 'useminPrepare'
  , 'concat'
  , 'autoprefixer:dist'
  , 'cssmin'
  , 'uglify'
  , 'imagemin'
  , 'svgmin'
  , 'filerev'
  , 'usemin'
  , 'htmlmin'
  ]);

  grunt.registerTask('deploy', [
    'check'
  , 'test'
  , 'build'
  , 'buildcontrol'
  ]);

  grunt.registerTask('default', [
    'check'
  , 'test'
  , 'build'
  ]);
};
