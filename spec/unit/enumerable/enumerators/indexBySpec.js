define(['enumerable/main', 'iterator/arrayIterator'], 
    function (Enumerable, ArrayIterator) {
        describe('Index by', function () {
            var records = [
                    {name: 'Ivan', age: 25},
                    {name: 'Georgi', age: 23},
                    {name: 'Pesho', age: 12},
                    {name: 'Smith', age: 9},
                    {name: 'Donald', age: 34}
                ],
                recordIterator = new ArrayIterator(records),
                recordEnumerator = new Enumerable(recordIterator);
                
            
            it('should create an object with indexed properties as keys', function () {
                var result = recordEnumerator.indexBy('name');
                for(var i = 0; i < records.length; i++) {
                    var record = records[i],
                        key = record.name;
                        
                    expect(result[key]).toBe(record);
                }
            });
            
            it('should return empty object on empty collections' , function() {
                var emptyIterator = new ArrayIterator([]),
                    emptyEnumerator = new Enumerable(emptyIterator);
                    
                var result = emptyEnumerator.indexBy('name');
                expect(result).toEqual({});
            });
            
        });
    }
);