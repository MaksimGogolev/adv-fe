module.exports = Model.createModel({
    init: function(options) {
        options = options || {};
        $.extend(this.attributes, {
            count: options.count || 0,
            name: options.name
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
    setCount: function(count) {
        this.set('count', count);
    }
})
