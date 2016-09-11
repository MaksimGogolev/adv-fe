module.exports = function TuneControls() {
    var elem = $('<div></div>');

    var onIncCallback;
    var onDecCallback;

    function render() {
        elem.html(App.templates['tune-controls']({}));
        subscribeHandlers(elem);

        return this;
    }

    function subscribeHandlers() {
        elem.find('.tune-controls__inc').click(function() {
            onIncCallback();
        });

        elem.find('.tune-controls__dec').click(function() {
            onDecCallback();
        });
    }

    return {
        render: render,
        onInc: function(cb) {
            onIncCallback = cb;
        },
        onDec: function(cb) {
            onDecCallback = cb;
        },
        elem: elem
    }
};