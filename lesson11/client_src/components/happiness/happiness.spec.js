var Happiness = require('./happiness.js');

describe('happiness', function () {
    beforeEach(function () {
        this.happines = new Happiness();
    });


    describe('set method ', function () {
        beforeEach(function() {
            spyOn(this.happines, 'add').and.callThrough();
            spyOn(this.happines, 'remove');
        });

        
        it('should be defined', function () {
            expect(this.happines.set).toBeDefined();
            debugger;
        });

        it('should call add method', function () {
            this.happines.set([]);
            expect(this.happines.add).not.toHaveBeenCalled();

        });

        it('should call add method', function () {
            this.happines.set([{ getCount: function () { return 4; }}]);
            expect(this.happines.add).toHaveBeenCalledWith(4);


        });

        it('should call add method with correct arguments', function () {
            this.happines.set([{ getCount: function () { return 4 } } ]);
            this.happines.set([{ getCount: function () { return 1 } } ]);
            expect(this.happines.remove).toHaveBeenCalledWith(3);
        });

    });
});