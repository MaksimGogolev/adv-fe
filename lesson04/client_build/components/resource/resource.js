module.exports = function Resource(options) {
    var elem = $('<div></div>');
    var value = options.value || 0;

    function render() {
        elem.html(App.templates['resource']({
            name: options.name,
            value: value
        }));
        return this;
    }

    return {
        render: render,
        inc: function (count) {
            value+= count||1;
            render();
        },
        dec: function (count) {
            value-= count||1;
            render();
        },
        elem: elem
    }
};