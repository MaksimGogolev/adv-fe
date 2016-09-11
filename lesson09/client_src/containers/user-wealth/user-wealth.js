var Resource = require('components/resource/resource.js');

module.exports = function (options) {
    var elem = $('<div></div>');

    var resources = options.resources.map(function (resource) {
        resource.subscribe(function() {
            render();
        });
        return new Resource(resource);
    });

    function render() {
        elem.html(App.templates['user-wealth']({}));
        resources.forEach(function (resource) {
            elem.find('.user-wealth').append(resource.render().elem);
        });
        return this;
    }

    return {
        render: render,
        elem: elem
    }
};