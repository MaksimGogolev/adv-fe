module.exports = function Resource(options) {
    var elem = $('<div></div>');

    function render() {
        elem.html(App.templates['resource']({
            name: options.getName(),
            value: options.getCount()
        }));
        return this;
    }

    return {
        render: render,
        elem: elem
    }
};