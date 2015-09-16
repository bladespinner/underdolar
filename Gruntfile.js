module.exports = function(grunt) {
    grunt.initConfig({
        jasmine: {
            unit: {
                src: 'src/**/*.js',
                options: {
                    specs: 'spec/*Spec.js',
                    template: require('grunt-template-jasmine-requirejs')
                }
            }
        }
    });
    
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    
    // Default task(s).
    grunt.registerTask('default', ['uglify']);
};