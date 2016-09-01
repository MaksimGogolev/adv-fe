module.exports = function Happiness() {
    var catsContainer = [];

    function set(resources) {
        var cats = 0;
        resources.forEach(function (res) {
            cats += res.getCount();
        });

        var catsDiff = cats - catsContainer.length ;
        (catsDiff > 0 ) ? this.add(catsDiff) : this.remove(-catsDiff);
    }

    function add(num) {
        var newCats = [];

        for (var i = 0; i < num; i++) {
            newCats.push(
                $(App.templates['happiness'](getPosition()))
            );
        }

        newCats.forEach(function(cat) {
            $('.content').append( cat );
        });

        catsContainer = catsContainer.concat(newCats);
    }

    function remove(num) {
        var toTheHeaven = catsContainer.splice(0, num);
        toTheHeaven.forEach(function(cat) {
            cat.remove();
        });
    }

    function getPosition() {
        return {
            top: Math.floor(Math.random() * window.innerHeight),
            left: Math.floor(Math.random() * window.innerWidth)
        }
    }

    return {
        set: set,
        add: add,
        remove: remove
    }

};
