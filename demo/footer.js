define(
    [
        'text!./footer.html',
        'css!./footer.css'
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