define([], 
    function() {    	
    	function countBy(groupSelector) {
    		var counts = {};
    		
    		this.each(function(value, idx) {
    			var key = groupSelector(value, idx)
    			counts[key] = counts[key] ? counts[key] + 1 : 1;
    		});
    		
    		return counts;
    	}
        
        return countBy;
    }
);