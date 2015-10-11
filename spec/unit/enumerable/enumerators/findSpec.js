define(['enumerable/main', 'iterator/arrayIterator'], function (Enumerable, ArrayIterator) {
    describe('Enumerable#Find', function () {
        var data = [
            {name: 'Ivan', age: 25},
            {name: 'Georgi', age: 23},
            {name: 'Pesho', age: 12},
            {name: 'Smith', age: 9},
            {name: 'Donald', age: 34},
            {name: 'Ivan', age: 77}
        ],
        dataIterator = new ArrayIterator(data),
        dataEnumerator = new Enumerable(dataIterator);
        
        /* TODO: 
           ?Add mocks for filter and first
            methods and use them for this testset?
        */    
        it('should return the first found object if the predicate is true', function () {
            var result = dataEnumerator.find(function(person) {
                return person.name === 'Ivan';
            });
            
            expect(result).toEqual({
                name: 'Ivan',
                age: 25
            });
        });
        
        it('should return undefined when no value matches predicate', function () {
            var result = dataEnumerator.find(function() {
                return false;
            });
            
            expect(result).toEqual(undefined);
        });
    });
});