define(['enumerable/enumerators/groupBy', 'test/mock/enumerable'], function (groupBy, enumMock) {
    describe('Group by', function () {
        var groupByMocked,
            EnumerableMock = enumMock.EnumerableMock;
        
        beforeEach(function () {
            var enumerable = new EnumerableMock();
            groupByMocked = groupBy.bind(enumerable);
        })
        
        it('should group objects by selector', function () {
            enumMock.setData([
                {name: 'Ivan', age: 1},
                {name: 'Georgi', age: 1},
                {name: 'Pesho', age: 2},
                {name: 'Smith', age: 2},
                {name: 'Donald', age: 3},
            ]);
            
            var result = groupByMocked(function (person) {
                return person.age;
            });
            
            expect(result).toEqual({
                1: [
                    {name: 'Ivan', age: 1},
                    {name: 'Georgi', age: 1}
                ],
                2: [
                    {name: 'Pesho', age: 2},
                    {name: 'Smith', age: 2}
                ],
                3: [
                    {name: 'Donald', age: 3}
                ]
            });
        });
        
        it('should return empty object when there is no data', function () {
            enumMock.setData([]);
            
            var result = groupByMocked(function (person, index) {
                return person.age;
            });
            
            expect(result).toEqual({});
        });
    });
});