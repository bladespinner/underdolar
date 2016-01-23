define(['enumerable/main', 'iterator/arrayIterator'], function (Enumerable, ArrayIterator) {
    describe('First', function () {
        /**
         * TODO: ?Mock Enumerable#first dependencies?
         */
        
        it('should return furst object of enumerable', function () {
            var data = [
                {name: 'Ivan', age: 25},
                {name: 'Georgi', age: 23},
                {name: 'Pesho', age: 12},
                {name: 'Smith', age: 9},
                {name: 'Donald', age: 34}
            ],
            dataIterator = new ArrayIterator(data),
            dataEnumerable = new Enumerable(dataIterator);
            
            var result = dataEnumerable.first()
            
            expect(result).toEqual({
                name: 'Ivan',
                age: 25
            });
        });
        
        it('should return undefined if enumerable is empty', function () {
            var data = [],
                dataIterator = new ArrayIterator(data),
                dataEnumerable = new Enumerable(dataIterator);
            
            var result = dataEnumerable.first();
            
            expect(result).toEqual(undefined);
        });
    });
});