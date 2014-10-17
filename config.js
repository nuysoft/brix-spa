/* global require */
require.config({
    map: {
        '*': {
            css: '/bower_components/require-css/css.js',
            text: '/bower_components/requirejs-text/text.js'
        }
    },
    paths: {
        loader: '/bower_components/brix-loader/dist/loader',
        jquery: '/bower_components/jquery/dist/jquery',
        underscore: '/bower_components/underscore/underscore',
        director: '/bower_components/director/build/director',
        highlightjs: '/bower_components/highlightjs/highlight.pack',
        spa: '/src/spa'
    },
    shim: {
        director: {
            exports: 'Router'
        },
        highlightjs: {
            exports: 'hljs'
        }
    }
})