module.exports = function Resource(options) {
    var elem = $('<div></div>');

    var model = options.model;
    var value = model.getCount();
    var name = model.getName();

    model.subscribe(function() {
        value = model.getCount();
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