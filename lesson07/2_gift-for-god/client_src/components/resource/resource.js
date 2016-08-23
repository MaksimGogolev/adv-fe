module.exports = function Resource(options) {
    var elem = $('<div></div>');

    var value = options.getCount();
    var name = options.getName();

    options.subscribe(function() {
        value = options.getCount();
        render();
    });

    function render() {
        elem.html(App.templates['resource']({
            name: name,
            value: value
        }));
        return this;
    }

    return {
        render: render,
        elem: elem
    }
};