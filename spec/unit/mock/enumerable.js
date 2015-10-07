define([], function () {
    var data;
    
    function EnumerableMock() {
        this.each = function (callback) {
            for (var i = 0; i < data.length; i++) {
                callback(data[i], i);
            };
        };
    };
    
   return {
       setData: function (mockData) {
           data = mockData;
       },
       EnumerableMock: EnumerableMock
   };
});