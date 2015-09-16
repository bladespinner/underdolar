define([], 
    function() {
        function size() {
        	var iter = this.getIterator(),
        		len = 0;
        		
        	if(!iter.isFinite()) {
        		return Infinity;
        	}
        	
        	while (iter.hasMore()) {
        		len++;
        		iter.next();
        	};
        	
        	return len;
        }
        
        return size;
    }
);
