define([], 
    function() {
        function map(callback) {
            callback = callback || function (a) { return a; };
        	return this.yield(function(value, yieldCallback, idx) {
        		yieldCallback(callback(value, idx));
        	});
        }
        
        return map;
    }
);