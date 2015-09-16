define([], 
    function() {
        function toArray() {
        	var result = [];
        	
        	this.each(function(element, idx) {
        		result[idx] = element;
        	});
        	
        	return result;
        }
        
        return toArray;
    }
);