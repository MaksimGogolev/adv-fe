var GiftTunner = require('containers/gift-tunner/gift-tunner.js');
var GodHateIndicator = require('containers/god-hate-indicator/god-hate-indicator.js');
var Hate = require('models/hate.js');

module.exports = function GodGiftForm(options) {
    var elem = $('<div></div>');

    var BASE_HATE = 60;
    var hate = new Hate(BASE_HATE);

    var godHateIndicator = new GodHateIndicator({
        hate: hate.getCount()
    });

    var resourceTunners = options.userResources.map(function (resource) {
        var BASE_RESOURCE = resource.getCount();
        var resourceTunner = new GiftTunner({
            name: resource.getName()
        });

        resourceTunner.onInc(function () {
            if(resource.getCount()==0) {
                return console.log(
                    'You don\'t have any more '
                    + resource.getName()
                );
            }
            resource.dec();
            godHateIndicator.dec(resource.getHateCurrency());
            return 'ok';
        });
        resourceTunner.onDec(function () {
            if(resource.getCount()==BASE_RESOURCE) {
                return console.log(
                    'Are you trying steal '
                    + resource.getName()
                    + ' from God???'
                );
            }
            resource.inc();
            godHateIndicator.inc(resource.getHateCurrency());
            return 'ok';
        });
        return resourceTunner;
    });

    function render() {
        elem.html(App.templates['god-gift-form']({}));

        resourceTunners.forEach(function (resourceTunner) {
            elem.find('.god-gift-form__gift-tunner').append(resourceTunner.render().elem);
        });

        elem.find('.god-gift-form__hate').html(godHateIndicator.render().elem);

        subscribeHandlers(elem);

        return this;
    }

    function subscribeHandlers(elem) {
        elem.find('.god-gift-form__send').click(function() {
            console.log('send gift to God RA:');
            resourceTunners.forEach(function (tunner) {
                console.log(tunner.getName() + ': '+ tunner.getCount());
            });
        });
    }

    return {
        render: render,
        elem: elem
    }
};
