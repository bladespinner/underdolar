define(['enumerable/main', 'iterator/arrayIterator'], 
    function (Enumerable, ArrayIterator) {
        describe('Every', function () {
            var records = [
                    {name: 'Ivan', age: 25},
                    {name: 'Georgi', age: 23},
                    {name: 'Pesho', age: 12},
                    {name: 'Smith', age: 9},
                    {name: 'Donald', age: 34}
                ],
                recordIterator = new ArrayIterator(records),
                recordEnumerator = new Enumerable(recordIterator);
            
            it('should return false when condition is not true for all values', function () {
                var result = recordEnumerator.every(function (person) {
                    return person.age > 15;
                });
                
                expect(result).toEqual(false);
            });
            
            it('should return true when condition is true for all values', function () {
                var result = recordEnumerator.every(function (person, index) {
                    return person.age > 0;
                });
                
                expect(result).toEqual(true);
            });
            
            it('should check if values are truthly if no callback', function () {
                var truthyIterator = new ArrayIterator([true, {}, 128, 'greetings']),
                    truthyEnumerator = new Enumerable(truthyIterator);
                
                expect(truthyEnumerator.every()).toEqual(true);
                
                var falsyIterator = new ArrayIterator([false, undefined, null, true, {}, '55s']),
                    falsyEnumerator = new Enumerable(falsyIterator);
                
                expect(falsyEnumerator.every()).toEqual(false);
                
            });
            
            it('should return true for no values', function () {
                var emptyIterator = new ArrayIterator([]),
                    emptyEnumerator = new Enumerable(emptyIterator);
                    
                expect(emptyEnumerator.every()).toEqual(true);
            });
        });
    }
);