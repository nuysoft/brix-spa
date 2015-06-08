/* global define, location, console */
/* jshint multistr:true */
/*
    Router
        https://github.com/visionmedia/page.js
            Micro client-side router inspired by the Express router
        https://github.com/flatiron/director
            a tiny and isomorphic URL router for JavaScript
    URI
        https://github.com/medialize/URI.js
            Javascript URL mutation library
    
    TODO
        拦截和取消 Ajax 请求
 */
define(
    [
        'jquery', 'underscore', 'director', 'URIjs/URI', 'page',
        'brix/loader',
        'URIjs/URI.fragmentQuery', 'URIjs/URI.fragmentURI'
    ],
    function(
        $, _, Router, URI, Page,
        Loader
    ) {

        var DEBUG = ~location.search.indexOf('brix.spa.debug')

        return {
            // URL 路由
            Router: Router,
            // URL 操作库
            URI: URI,
            // URL 跳转
            Page: Page,
            // 选项集 settings
            settings: {
                // 1. 命名 TODO
                // 2. target 和 view 是否必要？
                container: '#app', // SPA 容器节点
                frame: 'app/frame', // 框架 View
                target: '#main', // 主内容区域
                view: 'app/main' // 默认在主内容区域上加载的 View
            },
            // 初始化选项集 settings
            setup: function(settings) {
                if (!settings) return this.settings
                _.extend(this.settings, settings)
                return this
            },
            // 启动路由监听
            start: function() {
                var that = this

                // 加载框架 View
                Loader.load($(this.settings.container), this.settings.frame, {}, function() {
                    var router = new Router()
                    router.on(/(.*)/, handle)
                    router.init()
                    that.router = router

                    if (!location.hash) handle(that.settings.view)
                })

                function handle(fragment) {
                    // https://github.com/flatiron/director/pull/264/files#diff-20711cb07e3243d3358513b78a0778a7R454
                    fragment = location.hash.slice(1)

                    var label = '[route] ' + fragment
                    if (DEBUG) {
                        console.time(label)
                        console.group(label)
                    }

                    var furi = new URI(fragment)
                    var moduleId = furi.path() || that.settings.view
                    var params = furi.query(true)
                    var target = params.target || that.settings.target
                    if (DEBUG) console.log(moduleId, params)

                    Loader.load($(target), moduleId, params, function() {
                        if (DEBUG) {
                            console.groupEnd(label)
                            console.timeEnd(label)
                        }
                    })
                }

                return this
            },
            stop: function() {
                // TODO
                return this
            },
            /*
                
             */
            navigate: function(params) {
                var uri = URI(location.href)
                var furi = URI(uri.fragment())
                furi.setSearch(params)
                uri.fragment(furi.href())
                Page(uri.href())
            },
            /*
                SPA.fragment().query(true)
                SPA.fragment().path()
             */
            fragment: function() {
                return URI(
                    URI(location.href).fragment()
                )
            }
        }
    }
)