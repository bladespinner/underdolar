define(['enumerable/enumerators/every', 'test/mock/enumerable'], function (every, enumMock) {
    describe('Every enumerator', function () {
        var everyMocked,
            EnumerableMock = enumMock.EnumerableMock;
        
        beforeEach(function () {
            var enumerable = new EnumerableMock();
            everyMocked = every.bind(enumerable);
        })
        
        it('should return false when condition is not true for all values', function () {
            enumMock.setData([
                {name: 'Ivan', age: 25},
                {name: 'Georgi', age: 23},
                {name: 'Pesho', age: 12},
                {name: 'Smith', age: 9},
                {name: 'Donald', age: 34},
            ]);
            
            var result = everyMocked(function (person) {
                return person.age > 15;
            });
            
            expect(result).toEqual(false);
        });
        
        it('should return true when condition is true for all values', function () {
            enumMock.setData([
                {name: 'Ivan', age: 25},
                {name: 'Georgi', age: 23},
                {name: 'Pesho', age: 12},
                {name: 'Smith', age: 9},
                {name: 'Donald', age: 34},
            ]);
            
            var result = everyMocked(function (person, index) {
                return person.age > 0;
            });
            
            expect(result).toEqual(true);
        });
        
        it('should check if values are truthly if no callback', function () {
            enumMock.setData([true, {}, 128, 'greetings']);
            var result = everyMocked();
            expect(result).toEqual(true);
            
            enumMock.setData([false, undefined, null, true, {}, '55s']);
            result = everyMocked();
            expect(result).toEqual(false);
            
        });
        
        it('should return true for no values', function () {
            enumMock.setData([]);
            var result = everyMocked();
            expect(result).toEqual(true);
        });
    });
});