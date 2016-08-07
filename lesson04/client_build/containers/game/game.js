var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');
var UserWealth = require('containers/user-wealth/user-wealth.js');

module.exports = function Game () {
    var elem = $('<div></div>');

    function render () {
        elem.html(App.templates['game']({}));

        var userWealth = new UserWealth({
            gold: 20,
            copper: 30,
            some:30
        });

        var godGiftForm = new GodGiftForm({
            userWealth: userWealth
        });


        elem.find('.game__user-wealth').html( userWealth.render().elem);
        elem.find('.game__god-gift-form').html( godGiftForm.render().elem);

        return this;
    }

    return {
        render: render,
        elem: elem
    }

};