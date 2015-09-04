/// <reference path="underdolar.js" />


function test() {
	var valid = true;
	var depth = 0;
	function testSet(name, test) {
		depth++;
		valid = true;
		var tabs = '';
		for(var i = 0; i < depth; i++) {
			tabs += '    ';
		}
		console.log(tabs + name);
		test();
		if(!valid) {
			console.error(tabs + 'Failed');
		} else {
			console.log(tabs + 'Passed');
		}
		depth--;
	}
	
	function expect(val) {
		var tabs = '';
		for(var i = 0; i < depth + 1; i++) {
			tabs += '    ';
		}
		function compare(a,b) {
			if(typeof a == 'number' || typeof a == 'string') {
				return a === b;
			}
			if(a === b) return true;
			
			var o1 = Object(a),
				o2 = Object(b);
				
			if(a.length > 0) {
				if(a.length != b.length) {
					return false;
				}
				
				for(var i = 0; i < a.length; i++) {
					if(!compare(a[i], b[i])) {
						return false;
					}
				}
				return true;
			}
			
			for(var prop in o1) {
				if(!compare(o1[prop], o2[prop])) {
					return false;
				}
			}
			
			for(var prop in o2) {
				if(!compare(o1[prop], o2[prop])) {
					return false;
				}
			}
			
			return true;
		}
		return {
			toBe: function(expected) {
				if(!compare(val, expected)) {
					console.error(tabs + 'Expected ' + val + ' to be ' + expected);
					valid = false;
				}
			},
			toNotBe: function(expected) {
				if(compare(val, expected)) {
					console.error(tabs + 'Expected ' + val + ' to be ' + expected);
					valid = false;
				}
			}
		};
	}
	
	var infiniteCollection = {
		getIterator: function() {
			var getIter = function() {
				return {
					isFinite: function() {
						return false;
					},
					hasMore: function() {
						return true;
					},
					next: function() {
						return 1;
					},
					newInstance: getIter
				}
			}
			return getIter();
		}
	};

	testSet('Identity should always return passed value', function() {
		expect(_$.funct.identity([1,2,3,4,5])()).toBe([1,2,3,4,5]);
		expect(_$.funct.identity('Test')()).toBe('Test');
		expect(_$.funct.identity({a:'5',b:[1,2,3]})()).toBe({a:'5',b:[1,2,3]});
	});
	
	testSet('_$#toArray returns value correctly as array', function() {
		testSet('..returns empty array on empty collection', function() {
			expect(_$([]).toArray()).toBe([]);
		});
		
		testSet('..throws an exception on infinite collection', function() {
			var exception;
			try {
				_$(infiniteCollection).toArray()
			} catch(e) {
				exception = e;
			}
			expect(exception).toBe('Can not enumerate infinite collection')
		});

		testSet('..returns elements in collection initialized with array as array', function() {
			expect(_$([1,2,3]).toArray()).toBe([1,2,3]);
		});
		
		testSet('..returns elements in collection initialized with argument list as array', function() {
			(function(){
				expect(_$(arguments).toArray()).toBe([1,2,3]);
			})(1,2,3);
		});
		
		testSet('..returns elements in collection initialized with arraylike object as array', function() {
			expect(_$({'0': 1, '1': 2, '2': 3, length: 3}).toArray()).toBe([1,2,3]);
		});
		
		testSet('..returns elements in collection initialized with sparse array as array', function() {
			expect(_$([1,,,2,3,]).toArray()).toBe([1,2,3]);
		});
	});
	
	testSet('_$(arr)#yield', function() {
		testSet('..callsback with correct values', function() {
			expect(_$([1,2,3,5,6]).yield(function(value, yieldCallback, idx) {
				yieldCallback(value);
			}).toArray()).toBe([1,2,3,5,6]);
			expect(_$([]).yield(function(value, yieldCallback, idx) {
				yieldCallback(value);
			}).toArray()).toBe([]);
		});
		
		testSet('..callsback with correct indexes', function() {
			expect(_$([8,2,3,5,6]).yield(function(value, yieldCallback, idx) {
				yieldCallback(idx);
			}).toArray()).toBe([0,1,2,3,4]);
		});
		
		testSet('..callbacks with infinite collection', function() {
			var iter = _$(infiniteCollection).yield(function(value, yieldCallback, idx) {
				yieldCallback(value);
			}).getIterator();
			
			for(var i = 0; i < 100; i++) {
				expect(iter.next()).toBe(1);
			}
		});
		
		testSet('..returning false from callback stops iteratrion', function() {
			expect(_$([8,2,3,5,6]).yield(function(value, yieldCallback, idx) {
				if(idx >= 3) return false;
				yieldCallback(value);
			}).toArray()).toBe([8,2,3]);
		});
	});
	
	testSet('_$(arr)#each', function() {
		testSet('..callsback with correct values', function() {
			var a = [];
			_$([1,2,3,4,5]).each(function(value) {
				a.push(value);	
			});
			expect(a).toBe([1,2,3,4,5]);
		});
		
		testSet('..callsback with correct values on sparse arrays', function() {
			var a = [];
			_$([1,,2,3,,,4,5]).each(function(value) {
				a.push(value);	
			});
			expect(a).toBe([1,2,3,4,5]);
		});
		
		testSet('..throws an exception on infinite collection', function() {
			var a = [],
				exception;
			try {
				_$(infiniteCollection).each(function(value) {
					a.push(value);	
				});
			} catch(e) {
				exception = e;
			}
			expect(exception).toBe('Can not enumerate infinite collection');
		});
		
		testSet('..callbacks with correct indexes', function() {
			var a = [];
			_$([8,2,4,4,5]).each(function(value, index) {
				a.push(index);	
			});
			expect(a).toBe([0,1,2,3,4]);
		});
	});
	
	testSet('_$(arr)#identity', function() {
		testSet('..does not change the collection', function() {
			expect(_$([1,2,3,4,5]).identity().toArray()).toBe([1,2,3,4,5]);
			expect(_$([]).identity().toArray()).toBe([]);
		});
	});
	
	testSet('_$(arr)#tap', function() {
		testSet('..does not change the collection', function() {
			expect(_$([1,2,3,4,5]).tap(function(){}).toArray()).toBe([1,2,3,4,5]);
			expect(_$([]).tap(function(){}).toArray()).toBe([]);
		});
		
		testSet('..callsback with correct values', function() {
			var a = [];
			_$([1,2,3,4,5]).tap(function(value) {
				a.push(value);	
			}).toArray();
			expect(a).toBe([1,2,3,4,5]);
		});
	});
	
	testSet('_$(arr)#size', function() {
		testSet('..shows the correct length', function() {
			expect(_$([1,2,3,4,5]).size()).toBe(5);
			expect(_$([]).size()).toBe(0);
			expect(_$([1,,5]).size()).toBe(2);
		});
	});
	
	testSet('_$#takeWhile', function() {
		testSet('..can takewhile based on value', function() {
			var result = _$([1,2,3,4,5,-1,-2,-3,2]).
				takeWhile(function(value) {
					return value > 0;
				}).
				toArray();
			expect(result).toBe([1,2,3,4,5]);
		});
		testSet('..can takewhile based on index', function() {
			var result = _$([1,2,3,4,5]).
				takeWhile(function(value, index) {
					return index < 3;
				}).
				toArray();
			expect(result).toBe([1,2,3]);
		});
		testSet('..can takewhile with a limit', function() {
			var result = _$([1,2,3,4,-1,5,6,-1,7,8]).
				takeWhile(function(value, index) {
					return value > 0;
				}, 2).
				toArray();
			expect(result).toBe([1,2,3,4,5,6]);
		});
	});
	
	testSet('_$#take', function() {
		testSet('..can take from list', function() {
			var result = _$([1,2,3,4,5]).
				take(2).
				toArray();
			expect(result).toBe([1,2]);
		});
		testSet('..can take with default count parameter', function() {
			var result = _$([1,2,3,4,5]).
				take().
				toArray();
			expect(result).toBe([1]);
		});
		testSet('..can take less than count', function() {
			var result = _$([1,2,3,4,5]).
				take(10).
				toArray();
			expect(result).toBe([1,2,3,4,5]);
		});
	});
	
	testSet('_$#map', function() {
		var result = _$([1,2,3,4,5]).
			map(function(value, idx){
				return value * 2
			}).
			toArray();
		expect(result).toBe([2,4,6,8,10]);
	});
	
	testSet('_$#reduce', function() {
		testSet('..can reduce a list', function() {
			var result = _$([1,2,3,4,5]).
				reduce(function(memo, element, idx){
					return memo + element;
				}, 0);
			expect(result).toBe(15);
		});
		
		testSet('..can reduce an empty list', function() {
			var result = _$([]).
				reduce(function(memo, element, idx){
					return memo + element;
				}, 0);
			expect(result).toBe(0);
		});
		
		testSet('..can reduce an empty list with no memo', function() {
			var result = _$([]).
				reduce(function(memo, element, idx){
					return memo + element;
				});
			expect(result).toBe(undefined);
		});
	});
	
	testSet('_$#isFiniteCollection', function() {
		testSet('..empty array is finite collection', function() {
			expect(_$([]).isFiniteCollection()).toBe(true);
		});
		
		testSet('..finite element array is finite collection', function() {
			expect(_$([1,2,3,4,5]).isFiniteCollection()).toBe(true)
		});
		
		testSet('..infinite generator is infinite collection', function() {
			expect(_$(infiniteCollection).isFiniteCollection()).toBe(false);
		});
	});
}


/*

function ArrayIterator(arr) {
		var currentIdx = -1;
		var O = Object(arr);
		var len = O.length >>> 0;
		
		function nextValid() {
			do {
				currentIdx++;
			}
			while(currentIdx < len && !arr.hasOwnProperty(currentIdx));
		}
		
		nextValid();
		
		this.isFinite = function() {
			return true;
		};
		
		this.hasMore = function() {
			return currentIdx < len;
		};
		
		this.next = function() {
			if (!this.hasMore()) {
				throw new Error('No more elements left iterate in ArrayIterator');
			}
			var result = arr[currentIdx];
			nextValid();
			return result;
		};
		
		this.newInstance = function() {
			return new ArrayIterator(arr);
		};
	}
 */
test();