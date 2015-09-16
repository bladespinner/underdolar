define(['enumerable/enumerable'], 
    function(Enumerable) {
        function tap(callback) {
            this.each(callback);
            return new Enumerable(this.getIterator().newInstance());
        }
        
        return tap;
    }
);