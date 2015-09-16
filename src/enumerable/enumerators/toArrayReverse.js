define([], 
    function() {
        function toArrayReverse() {
        	var result = [];
        	
        	this.each(function(element) {
        		result.unshift(element);
        	});
        	
        	return result;
        }
        
        return toArrayReverse;
    }
);

