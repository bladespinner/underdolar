define([], 
    function() {
        function reject(predicate) {
            //TODO move negate to util
            return this.filter(_$.pred.negate(predicate));
        }
        
        return reject;
    }
);