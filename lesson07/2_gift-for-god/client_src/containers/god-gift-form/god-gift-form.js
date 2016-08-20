var GiftTunner = require('containers/gift-tunner/gift-tunner.js');
var GodHateIndicator = require('containers/god-hate-indicator/god-hate-indicator.js');
var Resource  = require('models/resource.js');
var Hate = require('models/hate.js');

module.exports = function GodGiftForm(options) {
    var elem = $('<div></div>');

    var allGiftResources = [];

    function render() {

        var BASE_HATE = 60;
        var hate = new Hate(BASE_HATE);
        var godHateIndicator = new GodHateIndicator({
            hate: hate
        });

        elem.html(App.templates['god-gift-form']({}));

        options.userResources.forEach(function (resource) {

            var BASE_RESOURCE = resource.getCount();

            var giftResource = new Resource({
                name: resource.getName(),
                hateCurrency: resource.getHateCurrency()
            });

            allGiftResources.push(giftResource);

            giftResource.subscribe(function () {
                resource.setCount(BASE_RESOURCE - giftResource.getCount());
                hate.setCount(BASE_HATE - allGiftResources.reduce(function (sum, item) {
                        return sum + item.getCount()*item.getHateCurrency();
                    },0));
            });

            var resourceTunner = new GiftTunner({
                resource: giftResource
            });

            elem.find('.god-gift-form__gift-tunner').append(resourceTunner.render().elem);
        });

        elem.find('.god-gift-form__hate').html(godHateIndicator.render().elem);

        subscribeHandlers(elem);

        return this;
    }

    function subscribeHandlers(elem) {
        elem.find('.god-gift-form__send').click(function() {
            console.log('send gift to God RA:');
            allGiftResources.forEach(function (resource) {
                console.log(resource.getName() + ': '+ resource.getCount());
            });
        });
    }

    return {
        render: render,
        elem: elem
    }
};
