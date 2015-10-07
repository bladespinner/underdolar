define(['enumerable/enumerators/each', 'util/exceptions'], function (each, Exceptions) {
    describe('Each enumerator', function () {
        var eachMocked,
            data,
            isFinite = true;
        
        beforeEach(function () {
            eachMocked = each.bind({
                getIterator: function () {
                    return {
                        next: function () {
                            return data.pop();
                        },
                        hasMore: function () {
                            return data.length != 0;
                        }
                    }
                },
                isFiniteEnumerable: function () {
                    return isFinite;
                }
            });
        })
        
        it('should emit each based on value', function () {
            data = [1, 2, 'dog', '34'];
            
            var result = [];
            
            eachMocked(function (value) {
                result.push(value);
            });
            
            expect(result).toEqual(['34', 'dog', 2, 1]);
        });
        
        it('should emit each based on index', function () {
            data = [1, 2, 'dog', '34'];
            
            var result = [];
            
            eachMocked(function (value, index) {
                result.push(index);
            });
            
            expect(result).toEqual([0, 1, 2, 3]);
        });
        
        it('should not emit with no values from iterator', function () {
            data = [];
            
            var result = [];
            
            eachMocked(function (value, index) {
                result.push(index);
            });
            
            expect(result).toEqual([]);
        });
        
        it('should throw an error on infinite enumerable', function () {
            isFinite = false;
            
            try {
                eachMocked(function (value, index) {
                    result.push(index);
                });
            } catch (e) {
                expect(e).toBe(Exceptions.InfinteEnumerableEnumerationException)
            }
        });
    });
});