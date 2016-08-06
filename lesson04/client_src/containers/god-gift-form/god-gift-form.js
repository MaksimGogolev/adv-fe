var GiftTunner = require('containers/gift-tunner/gift-tunner.js');
var GodHateIndicator = require('containers/god-hate-indicator/god-hate-indicator.js');

module.exports = function GodGiftForm() {
    var elem = $('<div></div>');

    var godHateIndicator = new GodHateIndicator({
        hate: 30
    });
    var goldTunner = new GiftTunner({
        name: 'Gold',
        hateIndicator: godHateIndicator,
        hateCount: 4
    });
    var copperTunner = new GiftTunner({
        name: 'Copper',
        hateIndicator: godHateIndicator,
        hateCount: 1
    });

    function render() {
        elem.html(App.templates['god-gift-form']({}));

        elem.find('.god-gift-form__gold-tunner').html(goldTunner.render().elem);
        elem.find('.god-gift-form__copper-tunner').html(copperTunner.render().elem);
        elem.find('.god-gift-form__hate').html(godHateIndicator.render().elem);

        subscribeHandlers(elem);

        return this;
    }

    function subscribeHandlers(elem) {
        elem.find('.god-gift-form__send').click(function() {
            console.log('send gift [gold: ' + goldTunner.getCount() + ', copper:' + copperTunner.getCount() + ']');
        });
    }

    return {
        render: render,
        elem: elem
    }
};
