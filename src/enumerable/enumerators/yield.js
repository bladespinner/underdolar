define(['iterator/lambdaIterator', 'enumerable/enumerable'], 
    function(LambdaIterator, Enumerable) {
        var _yield = function(callback, finite) {
            var origIter = this.getIterator(),
                iter = new LambdaIterator(origIter, callback, finite);
                
            return new Enumerable(iter);
        }
        
        return _yield;
    }
);
