define([], 
    function() {
        function takeWhile(predicate, maxFails) {
        	maxFails = maxFails || 1;
        	return this.yield(function(value, yieldCallback, idx) {
        		if (!predicate(value, idx)) {
        			maxFails--;
        			if(maxFails <= 0) {
        				return false;
        			}
        		} else {
        			yieldCallback(value);
        		}
        	});
        }
        
        return takeWhile;
    }
);