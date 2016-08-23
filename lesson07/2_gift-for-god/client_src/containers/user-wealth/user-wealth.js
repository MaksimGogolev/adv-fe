var Resource = require('components/resource/resource.js');

module.exports = function (options) {
    var elem = $('<div></div>');

    function render() {
        elem.html(App.templates['user-wealth']({}));
        options.resources.forEach(function (resource) {
            var resourceForRender = new Resource(resource);
            elem.find('.user-wealth').append(resourceForRender.render().elem);
        })
        return this;
    }

    return {
        render: render,
        elem: elem
    }
};