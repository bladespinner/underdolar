define(['enumerable/main', 'iterator/arrayIterator'], function (Enumerable, ArrayIterator) {
    describe('Min', function () {
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
        
        it('should find the min of the collection itself if no callback', function () {
           var result = recordEnumerator.pluck('age').min();
           
           expect(result).toEqual(9);
        });
        
        it('should find the min of the values returned by the callback', function () {
           var result = recordEnumerator.min(function (a) {
               return Math.sqrt(a.age);
           });
           
           expect(result).toEqual(3);
        });
        
        
        it('should return Infinity on no data', function () {
            recordIterator = new ArrayIterator([]);
            recordEnumerator = new Enumerable(recordIterator);
            var result = recordEnumerator.min();
            
            expect(result).toEqual(Infinity);
        });
    });
});