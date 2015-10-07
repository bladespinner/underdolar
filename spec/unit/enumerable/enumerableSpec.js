define(['enumerable/enumerable'], function (Enumerable) {
    describe('Enumerable', function () {
        it('should return a new instance of an iterator', function () {
            var iterNum = 0;
            
            function MockIterator() {
                this.num = iterNum;
                iterNum++;
                this.newInstance = function() {
                    return new MockIterator();
                }
            }
            
            var iterInstance = new MockIterator(),
                enumerable = new Enumerable(iterInstance),
                newIterInstance = enumerable.getIterator();
                
            expect(newIterInstance.num).toBe(1);
        });
    });
});