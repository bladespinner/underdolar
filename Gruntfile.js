module.exports = function(grunt) {
    grunt.initConfig({
        settings: {
            app: '.',
            testRoot: '<%= settings.app %>/spec',
            unit: '<%= settings.testRoot %>/unit',
            testBuild: '<%= settings.testRoot %>/testBuild',
            src: '<%= settings.app %>/src',
            srcLib: '<%= settings.src %>/lib',
            bowerComponents: '<%= settings.app %>/bower_components'
        },
        copy: {
            libs: {
                files: [
                    {expand: true, cwd:'<%= settings.bowerComponents %>/requirejs/', src: ['require.js'], dest: '<%= settings.srcLib %>/', filter: 'isFile'},
                ]
            },
            unit: {
                files: [
                    {expand: true, cwd:'<%= settings.src %>/', src: ['**'], dest: '<%= settings.testBuild %>/'},
                ],
            }
        },
        karma: {
          unit: {
            configFile: 'karma.conf.js'
          }
        },
        jasmine: {
            unit: {
                src: '<%= settings.testBuild %>/**/*.js',
                options: {
                    specs: '<%= settings.unit %>/**/*Spec.js',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: 'src/main.js'
                    }
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    grunt.registerTask('build:unit', [
        //'copy:libs',
        'copy:unit',
        'karma-unit'
    ]);
    
    grunt.registerTask('unit', [
        'build:unit',
        'jasmine:unit'
    ]);
};