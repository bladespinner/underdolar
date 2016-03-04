define(['enumerable/main', 'iterator/arrayIterator'], function (Enumerable, ArrayIterator) {
    describe('Map', function () {
        var recordIterator, recordEnumerator, data;
        
        beforeEach(function () {
            data = [
                {name: 'Ivan', age: 25},
                {name: 'Georgi', age: 23},
                {name: 'Pesho', age: 12},
                {name: 'Smith', age: 9},
                {name: 'Donald', age: 34},
            ];
            recordIterator = new ArrayIterator(data);
            recordEnumerator = new Enumerable(recordIterator);
        });
        
        it('should map the data according to a callback', function () {
           var result = recordEnumerator.map(function (value) {
               return value.age + 10;
           }).toArray();
           
           expect(result).toEqual([35, 33, 22, 19, 44]);
        });
        
        it('should map the data to an array of identical values on no callback', function () {
           var result = recordEnumerator.map().toArray();
           
           expect(result).toEqual(data);
        });
        
        
        it('should return empty array on no data', function () {
            recordIterator = new ArrayIterator([]);
            recordEnumerator = new Enumerable(recordIterator);
            var result = recordEnumerator.map(function (a) {return a}).toArray();
            
            expect(result).toEqual([]);
        });
    });
});