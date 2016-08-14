var Resource = require('components/resource/resource.js');

module.exports = function (options) {
    var elem = $('<div></div>');

    var goldIndicator = new Resource({
        model: options.gold
    });

    var copperIndicator = new Resource({
        model: options.copper
    });

    function render() {
        elem.html(App.templates['user-wealth']({}));

        elem.find('.user-wealth__gold').html(goldIndicator.render().elem);
        elem.find('.user-wealth__copper').html(copperIndicator.render().elem);
        return this;
    }

    return {
        render: render,
        goldIndicator: goldIndicator,
        copperIndicator: copperIndicator,
        elem: elem
    }
};