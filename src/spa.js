/* global define, location, console */
/* jshint multistr:true */
/*
    Router
        https://github.com/visionmedia/page.js
        https://github.com/flatiron/director
    URI
        https://github.com/medialize/URI.js
 */
define(
    [
        'jquery', 'underscore', 'director',
        'loader'
    ],
    function(
        $, _, Router,
        Loader
    ) {
        window.Loader = Loader
        return {
            options: {
                // SPA 容器节点
                container: '#container',
                // 框架页
                frame: 'frame',
                // 默认 View 关联的元素
                target: '#main',
                // 默认 View
                view: 'main'
            },
            start: function() {
                var that = this
                Loader.load($(this.options.container), this.options.frame, {}, function() {
                    var router = new Router()
                    router.on(/!?([^?]*)\??(.*)?/, handle)
                    router.init()
                    if (!location.hash) handle(that.options.view)
                })

                return this

                function handle(moduleId, params) {
                    console.log('[route]', moduleId, params)
                    moduleId = moduleId || that.options.view
                    params = Loader.Util.unparam(params)
                    Loader.load($(params.target || that.options.target), moduleId, params, function() {})
                }
            }
        }
    }
)