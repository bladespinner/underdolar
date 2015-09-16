define([], 
    function() {
        function map(callback) {
        	return this.yield(function(value, yieldCallback, idx) {
        		yieldCallback(callback(value, idx));
        	});
        }
        
        return map;
    }
);