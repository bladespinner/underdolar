define([], 
    function() {
    	function every(predicate) {
    		var result = true;
    		
    		predicate = predicate || function(element) {
    			return !!element;
    		}
    		
    		this.yield(function(value, yieldCallback, idx) {
    			if (!predicate(value, idx)) {
    				result = false;
    				return false;
    			}
    		});
    		
    		return result;
    	};
        
        return every;
    }
);