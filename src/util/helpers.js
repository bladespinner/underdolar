define([], function() {
    /**
     * Check if object can be converted to an array
     */
    function isArraylike(obj) {
        if(obj.isArray && obj.isArray()) {
            return true;
        }
        var len = obj.length;
        if (len >= 0) {
            return true;
        }
        return false;
    }
    
    /**
     * Check if object looks like an Enumerable
     */
    function isEnumerablelike(obj) {
        return obj.hasOwnProperty('getIterator');
    }
    
    /**
	 * Get array or arraylike object as array
	 */
	function asArray(obj) {
		return [].slice.call(obj)
	}
    
    return {
        isArraylike: isArraylike,
        isEnumerablelike: isEnumerablelike,
        asArray: asArray
    };
});