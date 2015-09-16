define(['util/functional'], 
    function(Funct) {
    	function min(selector) {
    		selector = selector || Funct.identity;
    		return Math.min.apply(null, this.map(selector).toArray());
    	}
        
        return min;
    }
);