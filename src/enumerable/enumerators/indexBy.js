define([], 
    function() {    	
    	function indexBy(indexName) {
    		var indexes = {};
    		
    		this.each(function(value, idx) {
    			indexes[value[indexName]] = value;
    		});
    		
    		return indexes;
    	}
        
        return indexBy;
    }
);