define([], function () {
    var data;
    
    function EnumerableMock() {
        this.each = function (callback) {
            for (var i = 0; i < data.length; i++) {
                callback(data[i], i);
            };
        };
        this.yield = function (callback) {
            var result = [],
                yieldCallback = result.push.bind(result);
            
            for (var i = 0; i < data.length; i++) {
                callback(data[i], yieldCallback, i);
            }
            
            data = result;
            return this;
        }
        this.value = function () {
            return data;
        }
    };
    
   return {
       setData: function (mockData) {
           data = mockData;
       },
       EnumerableMock: EnumerableMock
   };
});