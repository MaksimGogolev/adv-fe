module.exports = Model.createModel({
    init: function(count) {
        this.attributes.count = count || 0;
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
    setCount: function(count) {
        this.set('count', count);
    }
})

