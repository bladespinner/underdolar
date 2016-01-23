(function() {
    var requiredModules = ['enumerable/enumerable',
        'util/helpers'];
    
    /**
     * Methods with their synonims
     */
    var methods = [
        {name: 'yield', synonims: []},
        {name: 'each', synonims: []},
        {name: 'identity', synonims: []},
        {name: 'size', synonims: ['length']},
        {name: 'takeWhile', synonims: []},
        {name: 'take', synonims: ['limit']},
        {name: 'map', synonims: ['collect']},
        {name: 'reduce', synonims: ['inject', 'foldl']},
        {name: 'isFiniteEnumerable', synonims: []},
        {name: 'toArray', synonims: []},
        {name: 'first', synonims:['head']},
        {name: 'toArrayReverse', synonims: []},
        {name: 'rest', synonims: ['tail']},
        {name: 'reverse', synonims: []},
        {name: 'reduceRight', synonims: ['foldr']},
        {name: 'filter', synonims: ['select']},
        {name: 'skip', synonims: []},
        {name: 'find', synonims: ['detect']},
        {name: 'where', synonims: []},
        {name: 'findWhere', synonims: []},
        {name: 'reject', synonims: []},
        {name: 'every', synonims: []},
        {name: 'findWhere', synonims: ['all']},
        {name: 'some', synonims: ['any']},
        {name: 'includes', synonims: ['contains']},
        {name: 'invoke', synonims: []},
        {name: 'pluck', synonims: []},
        {name: 'max', synonims: []},
        {name: 'min', synonims: []},
        {name: 'sortBy', synonims: []},
        {name: 'groupBy', synonims: []},
        {name: 'indexBy', synonims: []},
        {name: 'countBy', synonims: []},
        {name: 'enumerate', synonims: []}
    ];
    
    for(var i = 0; i < methods.length; i++) {
        requiredModules.push('enumerable/enumerators/' + methods[i].name);
    }
    
    define(requiredModules, function(Enumerable, Helpers) {
        var argumentArray = Helpers.asArray(arguments),
            argCount = argumentArray.length;
            
        for(var i = 2; i < argCount; i++) {
            var methodDescriptor = methods[i - 2];
            Enumerable.prototype[methodDescriptor.name] = argumentArray[i];
            if(methodDescriptor.synonims) {
                for(var j = 0; j < methodDescriptor.synonims.length; j++) {
                    var synonim = methodDescriptor.synonims[j];
                    Enumerable.prototype[synonim] = Enumerable.prototype[methodDescriptor.name];
                }
            }
        }

        return Enumerable;
    }); 
})();