module.exports = function TuneControls(options) {
    var elem = $('<div></div>');

    var bar = options.bar; // <----
    var hateIndicator = options.hateIndicator; // <----
    var hateCount = options.hateCount; // <----
    var resourceIndicator = options.resourceIndicator;
    var resourceCount = options.resourceCount;

    function render() {
        elem.html(App.templates['tune-controls']({}));
        subscribeHandlers(elem);

        return this;
    }

    function subscribeHandlers() {
        elem.find('.tune-controls__inc').click(function() {
            bar.inc(); // <----
            hateIndicator.dec(hateCount); // <----
            resourceIndicator.dec(resourceCount);
        });
        elem.find('.tune-controls__dec').click(function() {
            bar.dec(); // <----
            hateIndicator.inc(hateCount); // <----
            resourceIndicator.inc(resourceCount);
        });
    }

    return {
        render: render,
        elem: elem
    }
};
