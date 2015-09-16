define([], 
    function() {
        function filter(predicate) {
    		return this.yield(function(value, yieldCallback, idx) {
    			if (predicate(value, idx)) {
    				yieldCallback(value);	
    			};
    		});
    	}
        
        return filter;
    }
);