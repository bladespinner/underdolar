define(['util/functional'], 
    function(Funct) {
    	function max(selector) {
    		selector = selector || Funct.identity;
    		return Math.max.apply(null, this.map(selector).toArray());
    	}
        
        return max;
    }
);