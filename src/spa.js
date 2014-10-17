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

        var rhash = /#?!?([^?]*)\??(.*)?/
        var r20 = /%20/g

        var Util = {
            // 解析 hash
            parse: function(fragment) {
                fragment = fragment || location.hash
                var parts = rhash.exec(fragment)
                return {
                    path: parts[1],
                    params: this.unparam(parts[2])
                }
            },
            // 解析参数为 string
            param: function(params) {
                if (!params) return ''
                var re = [];
                _.each(params, function(value, key) {
                    if (value === '') return
                    re.push(encodeURIComponent(key) + "=" + encodeURIComponent(value))
                })
                return re.join("&").replace(r20, "+")
            },
            // 解析参数为 object
            unparam: function(param) {
                if (!param) return {}
                if (_.isObject(param)) return param
                var re = {};
                for (var i = 0, arr = param.split('&'), kv;
                    (kv = arr[i]); i++) {
                    kv = kv.split('=');
                    re[kv[0]] = kv[1];
                }
                return re;
            }
        }

        return {
            // 选项集 options
            options: {
                // 1. 命名 TODO
                // 2. target 和 view 是否必要？
                container: '#app', // SPA 容器节点
                frame: 'app/frame', // 框架 View
                target: '#main', // 主内容区域
                view: 'app/main' // 默认在主内容区域上加载的 View
            },
            // 初始化选项集 options
            setup: function(options) {
                if (!options) return this.options
                _.extend(this.options, options)
                return this
            },
            // 启动路由监听
            start: function() {
                var that = this

                // 加载框架 View
                Loader.load($(this.options.container), this.options.frame, {}, function() {
                    var router = new Router()
                    router.on(/(.*)/, handle)
                    router.init()
                    if (!location.hash) handle(that.options.view)
                })

                function handle(fragment) {
                    var label = '[route] ' + fragment
                    console.time(label)
                    console.group(label)

                    var parts = Util.parse(fragment)
                    var moduleId = parts.path || that.options.view
                    var params = parts.params
                    var target = params.target || that.options.target
                    console.log(moduleId, params)

                    Loader.load($(target), moduleId, params, function() {
                        console.groupEnd(label)
                        console.timeEnd(label)
                    })
                }

                return this
            },
            stop: function() {
                // TODO
                return this
            },
            navigate: function(params) {
                var parts = Util.parse()
                _.extend(parts.params, Util.unparam(params))
                params = Util.param(parts.params)
                location.hash = '#' + parts.path + (params ? '?' + params : '')
                return this
            }
        }
    }
)