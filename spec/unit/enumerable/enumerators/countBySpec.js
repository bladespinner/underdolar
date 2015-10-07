define(['enumerable/enumerators/countBy', 'test/mock/enumerable'], function (countBy, enumMock) {
    describe('Enumerable', function () {
        var countByMocked,
            EnumerableMock = enumMock.EnumerableMock;
        
        beforeEach(function () {
            var enumerable = new EnumerableMock();
            countByMocked = countBy.bind(enumerable);
        })
        
        it('should count by counter based on value', function () {
            enumMock.setData([
                {name: 'Ivan', age: 25},
                {name: 'Georgi', age: 23},
                {name: 'Pesho', age: 12},
                {name: 'Smith', age: 9},
                {name: 'Donald', age: 34},
            ]);
            
            var result = countByMocked(function (person) {
                return Math.floor(person.age / 10);
            });
            
            expect(result).toEqual({
                0: 1,
                1: 1,
                2: 2,
                3: 1
            });
        });
        
        it('should count by counter based on index', function () {
            enumMock.setData([
                {name: 'Ivan', age: 25},
                {name: 'Georgi', age: 23},
                {name: 'Pesho', age: 12},
                {name: 'Smith', age: 9},
                {name: 'Donald', age: 34},
            ]);
            
            var result = countByMocked(function (person, index) {
                return index % 2;
            });
            
            expect(result).toEqual({
                0: 3,
                1: 2
            });
        });
        
        it('should return empty result on no values in enumerable', function () {
            enumMock.setData([]);
            
            var result = countByMocked(function (person, index) {
                return index % 2;
            });
            
            expect(result).toEqual({});
        });
    });
});