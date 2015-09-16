define([], 
    function() {
        function rest() {
           return this.skip(1).takeWhile(function () {return true});
        }
        
        return rest;
    }
);