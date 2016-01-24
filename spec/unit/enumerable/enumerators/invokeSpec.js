define(['enumerable/main', 'iterator/arrayIterator'], function (Enumerable, ArrayIterator) {
    describe('Filter enumerator', function () {
        var recordIterator, recordEnumerator;
        
        function getAgeBind(age) {
            return function () {
                return age;
            };
        }
        
        function getAgeUnbind() {
            return function (age, height) {
                return {age: age, height: height};
            };
        }
        
        describe('Argumentless', function () {
            beforeEach(function () {
                recordIterator = new ArrayIterator([
                    {name: 'Ivan', getAge: getAgeBind(25)},
                    {name: 'Georgi', getAge: getAgeBind(23)},
                    {name: 'Pesho', getAge: getAgeBind(12)},
                    {name: 'Smith', getAge: getAgeBind(9)},
                    {name: 'Donald', getAge: getAgeBind(34)},
                ]);
                recordEnumerator = new Enumerable(recordIterator);
            });
            
            it('should invoke the function for each member and map to its result', function () {
                var result = recordEnumerator.invoke('getAge').toArray();
                
                expect(result).toEqual([25, 23, 12, 9, 34]);
            });
        });
        
        describe('With Arguments', function () {
            beforeEach(function () {
                recordIterator = new ArrayIterator([
                    {name: 'Ivan', getAge: getAgeUnbind()},
                    {name: 'Georgi', getAge: getAgeUnbind()},
                    {name: 'Pesho', getAge: getAgeUnbind()},
                    {name: 'Smith', getAge: getAgeUnbind()},
                    {name: 'Donald', getAge: getAgeUnbind()},
                ]);
                
                recordEnumerator = new Enumerable(recordIterator);
            });
            
            it('should invoke the function with the additional arguments', function () {
                var result = recordEnumerator.invoke('getAge', 15, 8).toArray();
                
                expect(result).toEqual([
                    {age: 15, height: 8},
                    {age: 15, height: 8},
                    {age: 15, height: 8},
                    {age: 15, height: 8},
                    {age: 15, height: 8}
                ]);
            });
        });
        
        
        it('should return empty array on no data', function () {
            recordIterator = new ArrayIterator([]);
            recordEnumerator = new Enumerable(recordIterator);
            var result = recordEnumerator.invoke('test').toArray();
            
            expect(result).toEqual([]);
        });
    });
});