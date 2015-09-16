define(['util/exceptions'], function(Exceptions) {
    /**
     * Iterator for array objects
     */
    function ArrayIterator(arr) {
        var currentIdx = -1;
        var O = Object(arr);
        var len = O.length >>> 0;
        
        function nextValid() {
            do {
                currentIdx++;
            }
            while(currentIdx < len && !arr.hasOwnProperty(currentIdx));
        }
        
        nextValid();
        
        this.isFinite = function() {
            return true;
        };
        
        this.hasMore = function() {
            return currentIdx < len;
        };
        
        this.next = function() {
            if (!this.hasMore()) {
                throw Exceptions.EmptyIteratorException;
            }
            var result = arr[currentIdx];
            nextValid();
            return result;
        };
        
        this.newInstance = function() {
            return new ArrayIterator(arr);
        };
    }
    
    return ArrayIterator;
});
