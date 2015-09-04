'use strict';

var _$ = function() {
	var InfinteEnumerableEnumerationException = 'Can not enumerate infinite Enumerable',
		InvalidEnumerableException = 'Obj is not an valid Enumerable, and can not be converted to one',
		EmptyIteratorException = 'Attempted to get next element of empty or completely enumerated iterator';
		
	if (!Array.isArray) {
		Array.isArray = function(arg) {
			return Object.prototype.toString.call(arg) === '[object Array]';
		};
	}
	
	/**
	 * Check if object can be converted to an array
	 */ //INTERNAL
	function isArraylike(obj) {
		if(obj.isArray && obj.isArray()) {
			return true;
		}
		var len = obj.length;
		if (len >= 0) {
			return true;
		}
		return false;
	}
	
	/**
	 * Check if object looks like an Enumerable
	 */ //INTERNAL
	function isEnumerablelike(obj) {
		return obj.hasOwnProperty('getIterator');
	}
	
	/**
	 * Iterator for array objects
	 */
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
				throw EmptyIteratorException;
			}
			var result = arr[currentIdx];
			nextValid();
			return result;
		};
		
		this.newInstance = function() {
			return new ArrayIterator(arr);
		};
	}
	
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
				throw EmptyIteratorException;
			}
			var result = resultBuffer[resultPointer];
			resultPointer++;
			return result;
		}
		
		this.newInstance = function() {
			return new LambdaIterator(iterator, lambda, isFinite);
		};
	}
	
	/**
	 * Create new Enumerable from iterator
	 */
	function Enumerable(iterator) {
		this.getIterator = function() {
			return iterator.newInstance();
		}
	}
	
	var cProto = Enumerable.prototype;
		
	cProto.yield = function(callback, finite) {
		var origIter = this.getIterator(),
			iter = new LambdaIterator(origIter, callback, finite);
			
		return new Enumerable(iter);
	}
	
	cProto.each = function(callback) {
		var iter = this.getIterator(),
			idx = 0;
			
		if (!this.isFiniteEnumerable()) {
			throw InfinteEnumerableEnumerationException;
		}
			
		while (iter.hasMore()) {
			callback(iter.next(), idx);
			idx++;
		};
	};
	
	cProto.identity = function() {
		return this;
	}
	
	cProto.tap = function(callback) {
		this.each(callback);
		return this;
	};
	
	cProto.size = cProto.length = function() {
		var iter = this.getIterator(),
			len = 0;
			
		if(!iter.isFinite()) {
			return Infinity;
		}
		
		while (iter.hasMore()) {
			len++;
			iter.next();
		};
		
		return len;
	};
	
	cProto.takeWhile = function(predicate, maxFails) {
		maxFails = maxFails || 1;
		return this.yield(function(value, yieldCallback, idx) {
			if (!predicate(value, idx)) {
				maxFails--;
				if(maxFails <= 0) {
					return false;
				}
			} else {
				yieldCallback(value);
			}
		});
	};
	
	cProto.take = cProto.limit = function(count) {
		count = count || 1;
		return this.takeWhile(function(value, idx) {
			return idx < count;
		});
	};
	
	cProto.map = cProto.collect = function(callback) {
		return this.yield(function(value, yieldCallback, idx) {
			yieldCallback(callback(value, idx));
		});
	};
	
	cProto.reduce = cProto.inject = cProto.foldl = function(callback, memo) {
		this.each(function(element, idx) {
			memo = callback(memo, element, idx);
		});
		
		return memo;
	};
	
	cProto.isFiniteEnumerable = function() {
		return this.getIterator().isFinite();
	}
	
	cProto.toArray = function() {
		var result = [];
		
		this.each(function(element, idx) {
			result[idx] = element;
		});
		
		return result;
	};
	
	cProto.first = function(defaultValue) {
		var iter = this.take().getIterator();
		if(iter.hasMore()) {
			return iter.next();
		}
		return defaultValue;
	};
	
	cProto.toArrayReverse = function() {
		var result = [];
		
		this.each(function(element) {
			result.unshift(element);
		});
		
		return result;
	}
	
	cProto.reverse = function() {
		var iter = new ArrayIterator(this.toArrayReverse);
		return new Enumerable(iter);
	}
	
	cProto.reduceRight = cProto.foldr = function(callback, memo) {
		var len = this.length();
		
		this.reverse().each(function(element, idx) {
			memo = callback(memo, element, len - 1 - idx);
		});
		
		return memo;
	};
	
	cProto.filter = cProto.select = function(predicate) {
		return this.yield(function(value, yieldCallback, idx) {
			if (predicate(value, idx)) {
				yieldCallback(value);	
			};
		});
	};
	
	cProto.find = cProto.detect = function(predicate) {
		return this.filter(predicate).first();
	};
	
	cProto.where = function(properties) {
		return this.filter(function(element) {
			for (var property in properties) {
				if(element[property] !== properties[property]) {
					return false;
				}
			}
			return true;
		});
	};
	
	cProto.findWhere = function(properties) {
		return this.where(properties).first();
	};
	
	cProto.reject = function(predicate) {
		return this.filter(_$.negate(predicate));
	}
	
	cProto.every = cProto.all = function(predicate) {
		var result = true;
		
		predicate = predicate || function(element) {
			return !!element;
		}
		
		this.yield(function(value, yieldCallback, idx) {
			if (!predicate(value, idx)) {
				result = false;
				return false;
			}
		});
		
		return result;
	};
	
	cProto.some = cProto.any = function(predicate) {
		var result = false;
		
		predicate = predicate || function(element) {
			return !!element;
		}
		
		this.yield(function(value, yieldCallback, idx) {
			if (predicate(value, idx)) {
				result = true;
				return false;
			}
		});
		
		return result;
	};
	
	cProto.includes = cProto.contains = function(value) {
		return this.some(function(val) {
			return val === value;
		});
	}
	
	cProto.invoke = function(methodName) {
		var args = _$.util.asArray(arguments).slice(1);
		
		return this.map(function(value) {
			return value[methodName].call(null, args);
		});
	}
	
	cProto.pluck = function(propertyName) {
		return this.map(function(value) {
			return value[propertyName];
		});
	}
	
	cProto.max = function(selector) {
		selector = selector || this.identity;
		return Math.max.apply(null, this.map(selector).toArray());
	}
	
	cProto.min = function(selector) {
		selector = selector || this.identity;
		return Math.min.apply(null, this.map(selector).toArray());
	}
	
	cProto.sortBy = function(selector) {
		selector = selector || this.identity;
		var sorted = Array.prototype.sort.apply(null , this.map(selector).toArray());
		var iter = new ArrayIterator(sorted);
		return new Enumerable(iter);
	}
	
	cProto.groupBy = function(groupSelector) {
		var groups = {};
		
		this.each(function(value, idx) {
			groups[groupSelector(value, idx)] = value;
		});
		
		return groups;
	}
	
	cProto.indexBy = function(indexName) {
		var indexes = {};
		
		this.each(function(value, idx) {
			indexes[value[indexName]] = value;
		});
		
		return indexes;
	}
	
	cProto.countBy = function(groupSelector) {
		var counts = {};
		
		this.each(function(value, idx) {
			var key = groupSelector(value, idx)
			counts[key] = counts[key] ? counts[key] + 1 : 1;
		});
		
		return counts;
	}

	//shuffle
	//sample

	function asEnumerable(obj) {
		if (isEnumerablelike(obj)) {
			return new Enumerable(obj.getIterator());
		}
		
		if (isArraylike(obj)) {
			var arr = _$.util.asArray(obj);
			var arrIter = new ArrayIterator(arr);
			return new Enumerable(arrIter);
		}
		
		throw InvalidEnumerableException;
	}
		
	return function(inArr) {
		return asEnumerable(inArr);
	}
}();

_$.funct = {
	identity: function(a) {
		return function() {
			return a;
		};
	},
	compose: function() {
		var origArgs = arguments,
			startIdx = origArgs.length - 1;
			
		return function() {
			var idx = startIdx;
			var result = origArgs[startIdx].apply(this, arguments);
			idx--;
			
			while (idx > 0) {
				result = origArgs[idx].call(this, result);
				idx--;
			}
			
			return result;
		};
	}
};

_$.pred = {
	negate: function(fn) {
		return !fn.call(null, _$.util.asArray(arguments));
	}
};


_$.util = {
	/**
	 * Get array or arraylike object as array
	 */
	asArray: function(obj) {
		return [].slice.call(obj)
	}
};