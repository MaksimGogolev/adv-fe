var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');
var UserWealth = require('containers/user-wealth/user-wealth.js');
var Resource = require('models/resource.js');

module.exports = function Game() {
    var elem = $('<div></div>');

    var userGould = new Resource({
        count: 20,
        name: 'gold'
    });
    var userCopper = new Resource({
        count: 30,
        name: 'copper'
    });
    var some = new Resource({
        count: 30,
        name: 'some'
    });


    var giftForm = new GodGiftForm({
        resources: [userGould, userCopper, some]
    });

    var userWealth = new UserWealth({
        resources: [userGould, userCopper, some]
    });

    function render() {
        elem.html(App.templates['game']({}));
        elem.find('.game__god-gift-form').html(giftForm.render().elem)
        elem.find('.game__wealth').html(userWealth.render().elem)
        return this;
    }

    return {
        render: render,
        elem: elem
    }
};
