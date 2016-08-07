module.exports = function Bar(options) {
    var elem = $('<div></div>');
    var progress = options.count || 0;

    function render() {
        elem.html(App.templates['bar']({
            progress: Array(progress)
        }));
        return this;
    }

    return {
        render: render,
        inc: function(count) {
            progress += count || 1;
            render();
        },
        dec: function(count) {
            progress -= count || 1;
            render();
        },
        getCount: function() {
            return progress;
        },
        elem: elem
    }
};
