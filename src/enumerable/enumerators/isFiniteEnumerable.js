define([], 
    function() {
        function isFiniteEnumerable() {
        	return this.getIterator().isFinite();
        }
        
        return isFiniteEnumerable;
    }
);