define([], 
    function() {
    	function some(predicate) {
    		var result = false;
    		
    		predicate = predicate || function(element) {
    			return !!element;
    		}
    		
    		this.yield(function(value, yieldCallback, idx) {
    			if (predicate(value, idx)) {
    				result = true;
    				return false;
    			}
    		}).toArray();
    		
    		return result;
    	};
        
        return some;
    }
);