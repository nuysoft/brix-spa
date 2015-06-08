define(
    [
        'jquery', 'highlightjs', 'brix/loader', 'brix/doom',
        'text!./main.html',
        'css!/bower_components/highlightjs/styles/github.css'
    ],
    function(
        $, hljs, Loader, DOOM,
        template
    ) {
        function view() {}
        view.prototype = {
            on: function(types, selector, data, fn) {
                $(this.relatedElement || this.$relatedElement || this.element || this).on(types, selector, data, fn)
                return this
            },
            triggerHandler: function(event, data) {
                $(this.relatedElement || this.$relatedElement || this.element || this).triggerHandler(event, data)
                return this
            },
            render: function() {
                this.element.innerHTML = template

                /* jshint unused:false */
                $(this.element).find('pre code').each(function(index, code) {
                    code.innerText = Loader.Util.trimPredefined(code)
                    hljs.highlightBlock(code)
                })

                DOOM.manage(this, {
                    abort: function() {
                        console.log(arguments)
                    },
                    destroy: function() {
                        console.log(arguments)
                    }
                })
            }
        }
        return view
    }
)