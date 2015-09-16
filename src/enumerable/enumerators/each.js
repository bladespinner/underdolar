define(['util/exceptions'], 
    function(Exceptions) {
        function each(callback) {
            var iter = this.getIterator(),
                idx = 0;
                
            if (!this.isFiniteEnumerable()) {
                throw Exceptions.InfinteEnumerableEnumerationException;
            }
                
            while (iter.hasMore()) {
                callback(iter.next(), idx);
                idx++;
            };
        }
        
        return each;
    }
);
