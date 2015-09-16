define([], 
    function() {    	
    	function includes(value) {
    		return this.some(function(val) {
    			return val === value;
    		});
    	}
        
        return includes;
    }
);