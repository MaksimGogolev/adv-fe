module.exports = Model.createModel({
    init: function(options) {
        options = options || {};
        $.extend(this.attributes, {
            count: options.count || 0,
            name: options.name,
            hateCurrency: options.hateCurrency || 1
        });
    },
    inc: function(count) {
        this.set(
            'count', 
            this.get('count') + (count || 1)
        );
    },
    dec: function(count) {
        this.set(
            'count', 
            this.get('count') - (count || 1)
        );
    },
    getCount: function() {
        return this.get('count');
    },
    getName: function() {
        return this.get('name');
    },
    getHateCurrency: function() {
        return this.get('hateCurrency');
    },
    setCount: function(count) {
        this.set('count', count);
    }
});
