/* global requirejs */
requirejs.config({
    paths: {
        util: 'util',
        enumerable: 'enumerable',
        lib: 'lib',
        iterator: 'iterator'
    }
});

requirejs(['enumerable/main', 'util/helpers', 'iterator/arrayIterator', 'util/exceptions'], 
    function(Enumerable, Helpers, ArrayIterator, Exceptions){
        function asEnumerable(obj) {
    		if (Helpers.isEnumerablelike(obj)) {
    			return new Enumerable(obj.getIterator());
    		}
    		
    		if (Helpers.isArraylike(obj)) {
    			var arr = Helpers.asArray(obj);
    			var arrIter = new ArrayIterator(arr);
    			return new Enumerable(arrIter);
    		}
    		
    		throw Exceptions.InvalidEnumerableException;
    	}
        	
    	function _$(inArr) {
    		return asEnumerable(inArr);
    	}
        
        window._$ = _$;
    }
);