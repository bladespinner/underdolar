define([], 
    function() {
        function reduce(callback, memo) {
        	this.each(function(element, idx) {
        		memo = callback(memo, element, idx);
        	});
        	
        	return memo;
        }
        
        return reduce;
    }
);