define([], 
    function() {
        function where(properties) {
    		return this.filter(function(element) {
    			for (var property in properties) {
    				if(element[property] !== properties[property]) {
    					return false;
    				}
    			}
    			return true;
    		});
    	};
        
        return where;
    }
);