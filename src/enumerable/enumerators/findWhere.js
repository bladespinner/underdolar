define([], 
    function() {
        function findWhere(properties) {
    		return this.where(properties).first();
    	};
        
        return findWhere;
    }
);