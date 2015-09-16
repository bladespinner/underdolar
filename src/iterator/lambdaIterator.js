define(['util/exceptions'], function(Exceptions) {
    function LambdaIterator(iterator, lambda, isFinite) {
        var resultBuffer = [],
            resultPointer = 0,
            interrupt = false,
            idx = 0;
            
        function needsBuffering() {
            return resultBuffer.length <= resultPointer;
        }
        
        function bufferResults() {
            if(interrupt) {
                return;
            }
            
            while(needsBuffering() && iterator.hasMore()) {
                interrupt = lambda(iterator.next(), resultBuffer.push.bind(resultBuffer), idx) === false;
                idx++;
                if (interrupt) {
                    break;
                }
            }
        }
        
        this.isFinite = isFinite === undefined ? iterator.isFinite : function() {
            return isFinite;
        }
        
        this.hasMore = function() {
            bufferResults();
            return !needsBuffering();
        }
        
        this.next = function() {
            bufferResults();
            if (needsBuffering()) {
                throw Exceptions.EmptyIteratorException;
            }
            var result = resultBuffer[resultPointer];
            resultPointer++;
            return result;
        }
        
        this.newInstance = function() {
            return new LambdaIterator(iterator.newInstance(), lambda, isFinite);
        };
    }
    
    return LambdaIterator;
});