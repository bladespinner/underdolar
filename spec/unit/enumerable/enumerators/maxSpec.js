define(['enumerable/main', 'iterator/arrayIterator'], function (Enumerable, ArrayIterator) {
    describe('Max', function () {
        var recordIterator, recordEnumerator, data;
        
        beforeEach(function () {
            data = [
                {name: 'Ivan', age: 25},
                {name: 'Georgi', age: 23},
                {name: 'Pesho', age: 12},
                {name: 'Smith', age: 9},
                {name: 'Donald', age: 36},
            ];
            recordIterator = new ArrayIterator(data);
            recordEnumerator = new Enumerable(recordIterator);
        });
        
        it('should find the max of the collection itself if no callback', function () {
           var result = recordEnumerator.pluck('age').max();
           
           expect(result).toEqual(36);
        });
        
        it('should find the max of the values returned by the callback', function () {
           var result = recordEnumerator.max(function (a) {
               return Math.sqrt(a.age);
           });
           
           expect(result).toEqual(6);
        });
        
        
        it('should return -Infinity on no data', function () {
            recordIterator = new ArrayIterator([]);
            recordEnumerator = new Enumerable(recordIterator);
            var result = recordEnumerator.max();
            
            expect(result).toEqual(-Infinity);
        });
    });
});