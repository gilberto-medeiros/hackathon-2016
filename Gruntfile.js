module.exports = function(grunt) {
    grunt.initConfig({
        // get the configuration info from package.json
        // this way we can use things like name and version (pkg.name)

        nodemon: {
            dev: {
                script: 'server/index.js',
                options: {
                    nodeArgs: ['--debug'],
                    env: {
                        PORT: 3000
                    },
                    callback: function(nodemon) {
                        nodemon.on('log', function(event) {
                            console.log(event.colour);
                        });
                        nodemon.on('config:update', function() {
                            console.log('config updated, starting browser');
                            //require('open')('http://localhost:3000');
                            require('open')('http://localhost/Projects/MMAStars/public/');
                            //require('open')('http://localhost:8080/?port=5858');
                        }, 2000);
                        nodemon.on('restart', function() {
                            console.log('server restarted, refreshing browser');
                            require('fs').writeFileSync('.rebooted', 'rebooted');
                        }, 1000);
                    }
                },
            }
        },
        /*
        'node-inspector':{
            dev:{
                options: {
                  'web-host': 'localhost',
                  'web-port': 8080,
                  'debug-port': 5858,
                  'save-live-edit': true,
                  'preload': false
                }
            }
        },
        */
        watch: {
            gruntfile:{
                files:'Gruntfile.js',
                options: {
                    reload: true,
                    livereload: true
                }
            },
            src:{
                files: ['.rebooted', 'public/**/*.*', 'server/**/*.*'],
                options: {
                    reload: true,
                    livereload: true
                }
            }
        },
        concurrent: {
            target: {
                tasks: ['nodemon', /*'node-inspector', */'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    //grunt.loadNpmTasks('grunt-node-inspector');

    grunt.registerTask('default', ['concurrent:target']);
};
