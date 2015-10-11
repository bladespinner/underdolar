define([], 
    function() {    	
    	function groupBy(groupSelector) {
    		var groups = {};
    		
    		this.each(function(value, idx) {
                var groupName = groupSelector(value, idx);
                
                groups[groupName] = groups[groupName] || [];
                groups[groupName].push(value);
    		});
    		
    		return groups;
    	}
        
        return groupBy;
    }
);