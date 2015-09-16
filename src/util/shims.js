define([], function() {
    function isArray() {
        if (!Array.isArray) {
            Array.isArray = function(arg) {
                return Object.prototype.toString.call(arg) === '[object Array]';
            };
            return true;
        }
        return false;
    }
    
    return {
        isArray: isArray
    };
});