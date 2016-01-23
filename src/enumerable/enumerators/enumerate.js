define(['util/functional'], 
    function(Func) {
        function enumerate() {
        	this.each(Func.noop);
        }
        
        return enumerate;
    }
);