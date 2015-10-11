define(['enumerable/main', 'iterator/arrayIterator'], function (Enumerable, ArrayIterator) {
    describe('FindWhere enumerator', function () {
        var data = [
                {name: 'Ivan', age: 25},
                {name: 'Georgi', age: 23},
                {name: 'Pesho', age: 12},
                {name: 'Smith', age: 9},
                {name: 'Donald', age: 34}
            ],
            dataIterator = new ArrayIterator(data),
            dataEnumerable = new Enumerable(dataIterator);
        
        /**
         * TODO: ?Mock Enumerable#findWhere dependencies?
         */
        
        it('should return object containing given key/values', function () {
            var result = dataEnumerable.findWhere({
                name: 'Ivan'
            });
            
            expect(result).toEqual({
                name: 'Ivan',
                age: 25
            });
        });
        
        it('should return undefined if no objects have key/value', function () {
            var result = dataEnumerable.findWhere({
                name: 'Darwin' 
            });
            
            expect(result).toEqual(undefined);
        });
    });
});