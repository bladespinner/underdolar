define(['enumerable/enumerators/filter', 'test/mock/enumerable'], function (filter, enumMock) {
    describe('Filter enumerator', function () {
        var filterMocked,
            EnumerableMock = enumMock.EnumerableMock;
        
        beforeEach(function () {
            var enumerable = new EnumerableMock();
            filterMocked = filter.bind(enumerable);
            
            enumMock.setData([
                {name: 'Ivan', age: 25},
                {name: 'Georgi', age: 23},
                {name: 'Pesho', age: 12},
                {name: 'Smith', age: 9},
                {name: 'Donald', age: 34},
            ]);
        })
        
        it('should objects matching condition', function () {
            var result = filterMocked(function (person) {
                return person.age > 15;
            });
            
            expect(result).toEqual([
                {name: 'Ivan', age: 25},
                {name: 'Georgi', age: 23},
                {name: 'Donald', age: 34}
            ]);
        });
        
        it('should return empty array if no members match condition', function () {
            var result = filterMocked(function (person, index) {
                return person.age < 0;
            });
            
            expect(result).toEqual([]);
        });
    });
});