define(['util/helpers'], function(Helpers) {
    function negate(fn) {
    	return !fn.call(null, Helpers.asArray(arguments));
    }
    
    return {
        negate: negate
    };
});