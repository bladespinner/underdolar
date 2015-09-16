define([], 
    function() {
        function take(count) {
    		count = count || 1;
    		return this.takeWhile(function(value, idx) {
    			return idx < count;
    		});
    	}
        
        return take;
    }
);