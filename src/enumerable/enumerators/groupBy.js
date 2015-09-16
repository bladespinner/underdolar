define([], 
    function() {    	
    	function groupBy(groupSelector) {
    		var groups = {};
    		
    		this.each(function(value, idx) {
    			groups[groupSelector(value, idx)] = value;
    		});
    		
    		return groups;
    	}
        
        return groupBy;
    }
);