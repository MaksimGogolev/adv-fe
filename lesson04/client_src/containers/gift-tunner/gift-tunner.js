var Bar = require('components/bar/bar.js');
var TuneControls = require('components/tune-controls/tune-controls.js');

module.exports = function GiftTunner(options) {
    var elem = $('<div></div>');

    var hateIndicator = options.hateIndicator;
    var hateCount = options.hateCount;

    var bar = new Bar({});
    var controls = new TuneControls({
        bar: bar,
        hateIndicator: hateIndicator,
        hateCount: hateCount
    });
 
    function render() {
        elem.html(App.templates['gift-tunner']({}));

        elem.find('.gift-tunner__name').html(options.name);
        elem.find('.gift-tunner__bar').html(bar.render().elem);
        elem.find('.gift-tunner__controls').html(controls.render().elem);

        return this;
    }

    return {
        render: render,
        getCount: function() {
            return bar.getCount();
        },
        elem: elem
    }
};
