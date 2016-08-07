var Resource = require('components/resource/resource.js');

module.exports = function (options) {
    var elem = $('<div></div>');

    var goldIndicator = new Resource({
        name: 'Gold',
        value: options.gold
    });

    var copperIndicator = new Resource({
        name: 'Copper',
        value: options.copper
    });

    var someIndicator = new Resource({
        name: 'Some',
        value: options.some
    });

    function render() {
        elem.html(App.templates['user-wealth']({}));

        elem.find('.user-wealth__gold').html(goldIndicator.render().elem);
        elem.find('.user-wealth__copper').html(copperIndicator.render().elem);
        elem.find('.user-wealth__some').html(someIndicator.render().elem);
        return this;
    }

    return {
        render: render,
        goldIndicator: goldIndicator,
        copperIndicator: copperIndicator,
        someIndicator: someIndicator,
        elem: elem
    }
};