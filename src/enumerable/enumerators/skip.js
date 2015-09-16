define([], 
    function() {
        function skip(count) {
        	count = count || 1;
        	return this.skipWhile(function(value, idx){
        		return idx < count;
        	});
        }
        
        return skip;
    }
);