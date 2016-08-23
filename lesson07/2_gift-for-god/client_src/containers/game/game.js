var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');
var UserWealth = require('containers/user-wealth/user-wealth.js');
var Resource = require('models/resource.js');

module.exports = function Game () {
    var elem = $('<div></div>');
    var BASE_PATH = '/json-server';
    var WEALTH_URL = BASE_PATH + '/wealth/';

    var resourcesPromise = fetch(WEALTH_URL)
        .then(function (res) {
            return res.json();
        })
        .then(function(json){
           return json.resources;
        });

    function render () {

        resourcesPromise.then(function (resourcesPr) {

            var resourcesModelArr = resourcesPr.map(function (resource) {
                return new Resource({
                    count: resource.count,
                    name: resource.name,
                    hateCurrency: resource.hateCurrency
                });
            });
            var userWealth = new UserWealth({
                resources: resourcesModelArr
            });
            var godGiftForm = new GodGiftForm({
                userResources: resourcesModelArr
            });

            elem.html(App.templates['game']({}));

            elem.find('.game__user-wealth').html( userWealth.render().elem);
            elem.find('.game__god-gift-form').html( godGiftForm.render().elem);
        });

        return this;
    }

    return {
        render: render,
        elem: elem
    }
};