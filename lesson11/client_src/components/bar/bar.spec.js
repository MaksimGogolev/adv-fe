var Bar = require('./bar');

describe('bar', function () {
    beforeAll(function () {
        this.modelMock = jasmine.createSpyObj('model', ['getCount', 'subscribe']);
        this.count = 30;
        this.modelMock.getCount.and.returnValue(this.count);
        this.elemForEqual = $('<div></div>').html(App.templates['bar']({
            progress: Array(this.count)
        }));
    });

    beforeEach(function () {
        this.bar = new Bar({
            model: this.modelMock
        });
        spyOn(this.bar, 'render');
        spyOn(this.bar, 'getCount').and.callThrough();
    });

    it('getCount metod should be defined',function () {
        expect(this.bar.getCount).toBeDefined();
    });

    it('render metod should be defined',function () {
        expect(this.bar.render).toBeDefined();
    });

    it('model.subscribe should be called', function () {
        expect(this.modelMock.subscribe).toHaveBeenCalled();
    });

    it('model.getCount should be called', function () {
        expect(this.modelMock.getCount).toHaveBeenCalled();
    });

    it('getCount should return this.count', function () {
        expect(this.bar.getCount()).toEqual(this.count);
    });

    it('elem at the start should be equal $(<div></div>)', function () {
        expect(this.bar.elem).toEqual($('<div></div>'));
    });

    it('elem at the end should be equal elemForEqual', function () {
        this.bar.render();
        expect(this.bar.elem.innerHTML).toEqual(this.elemForEqual.innerHTML);
    });
});