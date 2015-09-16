define([], 
    function() {
        function find(predicate) {
        	return this.filter(predicate).first();
        };
        
        return find;
    }
);