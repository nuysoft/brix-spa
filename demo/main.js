define(
    [
        'text!./main.html'
    ],
    function(
        template
    ) {
        function view() {}
        view.prototype = {
            render: function() {
                this.element.innerHTML = template
            }
        }
        return view
    }
)