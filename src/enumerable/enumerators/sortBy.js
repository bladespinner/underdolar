define(['enumerable/enumerable','iterator/arrayIterator', 'util/functional'], 
    function(Enumerable, ArrayIterator, Funct) {
    	function sortBy(selector) {
    		selector = selector || Funct.identity;
    		var sorted = Array.prototype.sort.apply(null , this.map(selector).toArray());
    		var iter = new ArrayIterator(sorted);
    		return new Enumerable(iter);
    	}
        
        return sortBy;
    }
);