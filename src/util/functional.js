define([], 
    function() {
        function identity(a) {
    		return function() {
    			return a;
    		};
    	}
        
        function compose() {
    		var origArgs = arguments,
    			startIdx = origArgs.length - 1;
    			
    		return function() {
    			var idx = startIdx;
    			var result = origArgs[startIdx].apply(this, arguments);
    			idx--;
    			
    			while (idx > 0) {
    				result = origArgs[idx].call(this, result);
    				idx--;
    			}
    			
    			return result;
    		};
    	}
        
        function partial(funct) { 
    		var preArgs = _$(arguments);
    		return function() {
    			var args = _$(arguments).toArray(),
    				argPtr = 0;
    			
    			var compiledArgs = preArgs.skip().map(function(value) {
    				if(value === _$) {
    					var result = args[argPtr];
    					argPtr++;
    					return result;
    				}
    				return value;
    			});
    
    			var compiledArgsArr = compiledArgs.toArray()
    			return funct.apply(null, compiledArgsArr);
    		}
    	}
        
        return {
            identity: identity,
            compose: compose,
            partial: partial
        };
    }
);