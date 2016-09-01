var Resource = require('components/resource/resource.js');

module.exports = function UserWealth(options) {
    var elem = $('<div></div>');

    var resources = options.resources; 

    var ctResources = resources.map(function(resource) {
        return new Resource({
            resource: resource
        })
    });

    function render() {
        elem.html(App.templates['user-wealth']({}));
        elem.find('.user-wealth__resources').html(ctResources.map(function(r) {
            return r.render().elem;
        }));
        return this;
    }

    return {
        render: render,
        elem: elem
    }
};
