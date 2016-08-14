var GiftTunner = require('containers/gift-tunner/gift-tunner.js');
var GodHateIndicator = require('containers/god-hate-indicator/god-hate-indicator.js');

module.exports = function GodGiftForm(options) {
    var elem = $('<div></div>');

    var godHateIndicator = new GodHateIndicator({
        hate: 30
    });

    var userWealth = options.userWealth;

    var goldTunner = new GiftTunner({
        name: 'Gold',
        hateIndicator: godHateIndicator,
        hateCount: 3,
        resourceIndicator: userWealth.goldIndicator,
        resourceCount: 1
    });

    var copperTunner = new GiftTunner({
        name: 'Copper',
        hateIndicator: godHateIndicator,
        hateCount: 1,
        resourceIndicator: userWealth.copperIndicator,
        resourceCount: 1
    });

    var someTunner = new GiftTunner({
        name: 'Some',
        hateIndicator: godHateIndicator,
        hateCount: 2,
        resourceIndicator: userWealth.someIndicator,
        resourceCount: 1
    });

    function render() {
        elem.html(App.templates['god-gift-form']({}));

        elem.find('.god-gift-form__gold-tunner').html(goldTunner.render().elem);
        elem.find('.god-gift-form__copper-tunner').html(copperTunner.render().elem);
        elem.find('.god-gift-form__some-tunner').html(someTunner.render().elem);
        elem.find('.god-gift-form__hate').html(godHateIndicator.render().elem);

        subscribeHandlers(elem);

        return this;
    }

    function subscribeHandlers(elem) {
        elem.find('.god-gift-form__send').click(function() {
            console.log('send gift [gold: ' + goldTunner.getCount() + ', copper:' + copperTunner.getCount() + ', some:' + someTunner.getCount() + ']');
        });
    }

    return {
        render: render,
        elem: elem
    }
};
