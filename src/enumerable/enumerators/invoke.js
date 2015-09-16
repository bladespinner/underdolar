define(['util/helpers'], 
    function(Helpers) {
    	function invoke(methodName) {
    		var args = Helpers.asArray(arguments).slice(1);
    		
    		return this.map(function(value) {
    			return value[methodName].call(null, args);
    		});
    	}
        
        return invoke;
    }
);