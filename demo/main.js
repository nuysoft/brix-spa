define(
    [
        'jquery', 'highlightjs', 'loader',
        'text!./main.html',
        'css!/bower_components/highlightjs/styles/github.css'
    ],
    function(
        $, hljs, Loader,
        template
    ) {
        function view() {}
        view.prototype = {
            render: function() {
                this.element.innerHTML = template
                /* jshint unused:false */
                $(this.element).find('pre code').each(function(index, code) {
                    code.innerText = Loader.Util.trimPredefined(code)
                    hljs.highlightBlock(code)
                })
            }
        }
        return view
    }
)