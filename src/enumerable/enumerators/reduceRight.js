define([], 
    function() {
        function reduceRight(callback, memo) {
        	var len = this.length();
        	
        	this.reverse().each(function(element, idx) {
        		memo = callback(memo, element, len - 1 - idx);
        	});
        	
        	return memo;
        }
        
        return reduceRight;
    }
);
