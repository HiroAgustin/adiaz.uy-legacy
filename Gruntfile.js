module.exports = function (grunt)
{
  'use strict';

  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  , buildcontrol: 'grunt-build-control'
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
      bower: {
        files: ['bower.json']
      , tasks: ['wiredep']
      }
    , compass: {
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
      , hostname: '0.0.0.0'
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
      , cssDir: '.tmp/styles'
      , generatedImagesDir: '.tmp/images/generated'
      , imagesDir: '<%= yeoman.app %>/images'
      , javascriptsDir: '<%= yeoman.app %>/scripts'
      , fontsDir: '<%= yeoman.app %>/fonts'
      , importPath: '<%= yeoman.app %>/bower_components'
      , httpImagesPath: '<%= yeoman.app %>/images'
      , httpGeneratedImagesPath: '<%= yeoman.app %>/images/generated'
      , httpFontsPath: '<%= yeoman.app %>/fonts'
      , relativeAssets: false
      , assetCacheBuster: false
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
  , wiredep: {
      options: {
        exclude: [
          '<%= yeoman.app %>/bower_components/colors'
        , '<%= yeoman.app %>/bower_components/suit'
        ]
      }
    , app: {
        src: ['<%= yeoman.app %>/**/*.html']
      , ignorePath:  /\.\./
      }
    }
  , useminPrepare: {
      options: {
        dest: '<%= yeoman.dist %>'
      , root: '<%= yeoman.app %>'
      }
    , html: ['<%= yeoman.app %>/**/*.html']
    }
  , usemin: {
      options: {
        assetsDirs: '<%= yeoman.dist %>'
        // This is so we update image references in our templates
      , patterns: {
          js: [
            [/(images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        , css: [
            [/(fonts\/.*?\.(?:eot*|otf|svg|ttf|woff))/gm, 'Update the styles to reference our revved fonts']
          ]
        }
      }
    , html: ['<%= yeoman.dist %>/**/*.html']
    , css: ['<%= yeoman.dist %>/styles/**/*.css']
    , js: ['<%= yeoman.dist %>/scripts/**/*.js']
    }
  , htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true
        , collapseWhitespace: true
        , removeAttributeQuotes: true
        , removeCommentsFromCDATA: true
        , removeEmptyAttributes: true
        , removeOptionalTags: true
        , removeRedundantAttributes: true
        , useShortDoctype: true
        }
      , files: [{
          expand: true
        , cwd: '<%= yeoman.dist %>'
        , src: '**/*.html'
        , dest: '<%= yeoman.dist %>'
        }]
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
        files: [
          {
            expand: true
          , dot: true
          , cwd: '<%= yeoman.app %>'
          , src: [
              // Jekyll processes and moves HTML and text files.
              // Usemin moves CSS and javascript inside of Usemin blocks.
              // Copy moves asset files and directories.
              'images/**/*'
              // Like Jekyll, exclude files & folders prefixed with an underscore.
            , '!**/_*{,/**}'
              // Explicitly add any files your site needs for distribution here.
            , 'favicon.ico'
            ]
          , dest: '<%= yeoman.dist %>'
          }
        , {
            expand: true
          , flatten: true
          , cwd: '<%= yeoman.app %>'
          , src: ['bower_components/fontawesome/fonts/**/*']
          , dest: '<%= yeoman.dist %>/fonts/'
          }
        , {
            expand: true
          , src: ['CNAME']
          , dest: '<%= yeoman.dist %>'
          }
        ]
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
        algorithm: 'md5'
      , length: 8
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
          remote: 'https://github.com/HiroAgustin/adiaz.github.com.git'
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
    , 'wiredep'
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
  , 'wiredep'
  , 'jekyll:dist'
  , 'concurrent:dist'
  , 'useminPrepare'
  , 'concat:generated'
  , 'autoprefixer:dist'
  , 'cssmin:generated'
  , 'uglify:generated'
  , 'imagemin'
  , 'svgmin'
  , 'filerev'
  , 'usemin'
  , 'htmlmin'
  ]);

  grunt.registerTask('deploy', [
    'check'
  , 'build'
  , 'buildcontrol'
  ]);

  grunt.registerTask('default', [
    'check'
  , 'build'
  ]);
};
