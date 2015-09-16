define([], 
    function() {
    	function pluck(propertyName) {
    		return this.map(function(value) {
    			return value[propertyName];
    		});
    	}
        
        return pluck;
    }
);