define(['enumerable/enumerators/identity', 'test/mock/enumerable'], function (identity, enumMock) {
    describe('Identity', function () {
        var identityMocked,
            EnumerableMock = enumMock.EnumerableMock;
        
        beforeEach(function () {
            var enumerable = new EnumerableMock();
            identityMocked = identity.bind(enumerable);
            
            enumMock.setData([
                {name: 'Ivan', age: 25},
                {name: 'Georgi', age: 23},
                {name: 'Pesho', age: 12},
                {name: 'Smith', age: 9},
                {name: 'Donald', age: 34}
            ]);
        })
        
        it('should return data identity', function () {
            var result = identityMocked().value();
            
            expect(result).toEqual([
                {name: 'Ivan', age: 25},
                {name: 'Georgi', age: 23},
                {name: 'Pesho', age: 12},
                {name: 'Smith', age: 9},
                {name: 'Donald', age: 34}
            ]);
        });
    });
});