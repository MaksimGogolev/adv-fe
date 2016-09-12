module.exports = function Bar() {
    var elem = $('<div></div>');

    var count = 0;

    function render() {
        elem.html(App.templates['bar']({
            progress: new Array(count)
        }));
        return this;
    }

    return {
        render: render,
        getCount: function() {
            return count;
        },
        setCount: function(c) {
            count = c;
            render();
        },
        inc: function(c) {
            count += c || 1;
            render();
        },
        dec: function(c) {
            count -= c || 1;
            render();
        },
        elem: elem
    }
};