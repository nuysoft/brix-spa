/* global require */
require.config({
    map: {
        '*': {
            css: '/bower_components/require-css/css.js',
            text: '/bower_components/requirejs-text/text.js'
        }
    },
    paths: {
        'brix/loader': '/bower_components/brix-loader/dist/loader',
        'brix/spa': '/dist/spa',
        'brix/doom': '/dist/doom',

        jquery: '/bower_components/jquery/dist/jquery',
        underscore: '/bower_components/underscore/underscore',
        director: '/bower_components/director/build/director',
        URIjs: '/bower_components/uri.js/src/',
        page: '/bower_components/page/page',
        highlightjs: '/bower_components/highlightjs/highlight.pack'
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