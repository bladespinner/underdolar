define(['iterator/arrayIterator', 'enumerable/enumerable'], 
    function(ArrayIterator, Enumerable) {
        function reverse() {
        	var iter = new ArrayIterator(this.toArrayReverse);
        	return new Enumerable(iter);
        }
        
        return reverse;
    }
);
