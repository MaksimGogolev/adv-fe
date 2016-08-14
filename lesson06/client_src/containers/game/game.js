var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');
var UserWealth = require('containers/user-wealth/user-wealth.js');
var Resource = require('models/resource.js');

module.exports = function Game () {
    var elem = $('<div></div>');

    var userGoldResource = new Resource({
        count: 20,
        name: 'Gold'
    });
    var userCopperResource = new Resource({
        count: 30,
        name: 'Copper'
    });

    var userWealth = new UserWealth({
        gold: userGoldResource,
        copper: userCopperResource
    });

    var godGiftForm = new GodGiftForm({
        userGoldResource: userGoldResource,
        userCopperResource: userCopperResource
    });

    function render () {
        elem.html(App.templates['game']({}));

        elem.find('.game__user-wealth').html( userWealth.render().elem);
        elem.find('.game__god-gift-form').html( godGiftForm.render().elem);

        return this;
    }

    return {
        render: render,
        elem: elem
    }

};