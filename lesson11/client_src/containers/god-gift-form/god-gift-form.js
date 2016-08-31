var GiftTunner = require('containers/gift-tunner/gift-tunner.js');
var GodHateIndicator = require('containers/god-hate-indicator/god-hate-indicator.js');
var Resource  = require('models/resource.js');
var Hate = require('models/hate.js');

var Happiness = require('components/happiness/happiness.js');

module.exports = function GodGiftForm(options) {
    var elem = $('<div></div>');

    var BASE_HATE = 50;
    var resources = options.resources;


    var hate = new Hate(BASE_HATE);
    var happy = new Happiness();

    var godHateIndicator = new GodHateIndicator({
        hate: hate 
    });

    var tunnerResources = [];
    var tunners = resources.map(function(resource) {
        var tunnerResource = new Resource({
            count: 0,
            name: resource.getName()
        });
        var count = resource.getCount();
        tunnerResource.subscribe(function() {
            resource.setCount(count - tunnerResource.getCount());
        });
        tunnerResources.push(tunnerResource);
        return new GiftTunner({
            name: resource.getName(),
            resource: tunnerResource 
        });
    });

    var godPrefer = {
        'gold': 6,
        'copper': 2
    };

    Model.subscribeAll(tunnerResources, function(model) {
        var hateCount = BASE_HATE;
        tunnerResources.forEach(function(model) {
            hateCount -= model.getCount() * (godPrefer[model.getName()] || 1);
        });
        hate.setCount(hateCount);
    });

    function render() {
        elem.html(App.templates['god-gift-form']({}));

        elem.find('.god-gift-form__tunners').html(tunners.map(function(tunner) {
            return tunner.render().elem;
        }));
        elem.find('.god-gift-form__hate').html(godHateIndicator.render().elem);

        subscribeHandlers(elem);

        return this;
    }

    function subscribeHandlers(elem) {
        elem.find('.god-gift-form__send').click(function() {

            var resources = tunnerResources.map(function(resource) {
                return resource;
            });

            happy.set(resources);

            console.log(
                'send gift [' + 
                tunnerResources.map(function(resource) {
                    return resource.getName() + ':' + resource.getCount()
                }) +
                ']'
            );
        });
    }

    return {
        render: render,
        elem: elem
    }
};
