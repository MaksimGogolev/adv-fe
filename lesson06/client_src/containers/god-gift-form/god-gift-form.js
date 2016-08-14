var GiftTunner = require('containers/gift-tunner/gift-tunner.js');
var GodHateIndicator = require('containers/god-hate-indicator/god-hate-indicator.js');
var Resource  = require('models/resource.js');
var Hate = require('models/hate.js');

module.exports = function GodGiftForm(options) {
    var elem = $('<div></div>');

    var BASE_HATE = 30;
    var userGoldResource = options.userGoldResource;
    var BASE_GOLD = userGoldResource.getCount();
    var userCopperResource = options.userCopperResource;
    var BASE_COPPER = userCopperResource.getCount();

    var hate = new Hate(BASE_HATE);
    var goldGiftResource = new Resource({name: 'Gold'});
    var cooperGiftResource = new Resource({name: 'Copper'});

    Model.subscribeAll([goldGiftResource, cooperGiftResource], function() {
        hate.setCount(BASE_HATE - goldGiftResource.getCount() * 3 - cooperGiftResource.getCount() * 1);
        userGoldResource.setCount(BASE_GOLD - goldGiftResource.getCount());
        userCopperResource.setCount(BASE_COPPER - cooperGiftResource.getCount());
    });

    var godHateIndicator = new GodHateIndicator({
        hate: hate
    });

    var goldTunner = new GiftTunner({
        resource: goldGiftResource
    });

    var copperTunner = new GiftTunner({
        resource: cooperGiftResource
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
            console.log('send gift [gold: ' + goldTunner.getCount() + ', copper:' + copperTunner.getCount() + ', some:' + someTunner.getCount() + ']');
        });
    }

    return {
        render: render,
        elem: elem
    }
};
