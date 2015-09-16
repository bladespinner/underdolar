define([], 
    function() {
        function first(defaultValue) {
        	var iter = this.take().getIterator();
        	if(iter.hasMore()) {
        		return iter.next();
        	}
        	return defaultValue;
        }
        
        return first;
    }
);