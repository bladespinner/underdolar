define(['enumerable/main', 'iterator/arrayIterator'], 
    function (Enumerable, ArrayIterator) {
        describe('Includes', function () {
            var records = [
                    {name: 'Ivan', age: 25},
                    {name: 'Georgi', age: 23},
                    {name: 'Pesho', age: 12},
                    {name: 'Smith', age: 9},
                    {name: 'Donald', age: 34}
                ],
                recordIterator = new ArrayIterator(records),
                recordEnumerator = new Enumerable(recordIterator);
                
            
            fit('should return true if collection includes value', function () {
                var result = recordEnumerator.includes(records[0])
                expect(result).toBeTruthy();
            });
            
            it('should return false if collection does not include value', function () {
                var result = recordEnumerator.includes({name: 'Drago', age: 55});
                expect(result).toBeFalsy();
            });
            
            it('should return false on empty collections' , function() {
                var emptyIterator = new ArrayIterator([]),
                    emptyEnumerator = new Enumerable(emptyIterator);
                    
                var result = emptyEnumerator.includes(9);
                expect(result).toBeFalsy();
            });
            
        });
    }
);