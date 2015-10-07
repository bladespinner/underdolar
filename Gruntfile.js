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
        clean: {
            unit: {
                
            }
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
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    grunt.registerTask('build:unit', [
        'copy:unit',
    ]);
    
    grunt.registerTask('unit', [
        'build:unit',
        'karma:unit'
    ]);
};