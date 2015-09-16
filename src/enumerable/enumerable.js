define([], function() {
    /**
     * Create new Enumerable from iterator
     */
    function Enumerable(iterator) {
        this.getIterator = function() {
            return iterator.newInstance();
        }
    }
    
    return Enumerable;
});