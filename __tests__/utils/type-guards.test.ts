/**
 * Unit tests for lib/utils/type-guards.ts
 * Tests runtime type checking utilities
 */

import {
  isError,
  isObject,
  hasProperty,
  isStringArray,
  isNumberArray,
  getErrorMessage,
  isFunction,
  isPromise,
} from '../../lib/utils/type-guards';

describe('type-guards utilities', () => {
  describe('isError', () => {
    it('should return true for Error instances', () => {
      expect(isError(new Error('test'))).toBe(true);
    });

    it('should return true for TypeError instances', () => {
      expect(isError(new TypeError('type error'))).toBe(true);
    });

    it('should return true for RangeError instances', () => {
      expect(isError(new RangeError('range error'))).toBe(true);
    });

    it('should return true for SyntaxError instances', () => {
      expect(isError(new SyntaxError('syntax error'))).toBe(true);
    });

    it('should return true for ReferenceError instances', () => {
      expect(isError(new ReferenceError('ref error'))).toBe(true);
    });

    it('should return true for EvalError instances', () => {
      expect(isError(new EvalError('eval error'))).toBe(true);
    });

    it('should return true for URIError instances', () => {
      expect(isError(new URIError('uri error'))).toBe(true);
    });

    it('should return false for null', () => {
      expect(isError(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isError(undefined)).toBe(false);
    });

    it('should return false for string', () => {
      expect(isError('error message')).toBe(false);
    });

    it('should return false for number', () => {
      expect(isError(404)).toBe(false);
    });

    it('should return false for plain object with message property', () => {
      expect(isError({ message: 'error' })).toBe(false);
    });

    it('should return false for object with name and message', () => {
      expect(isError({ name: 'Error', message: 'test' })).toBe(false);
    });

    it('should return false for array', () => {
      expect(isError(['error'])).toBe(false);
    });

    it('should return false for boolean', () => {
      expect(isError(false)).toBe(false);
    });

    it('should return true for custom error class', () => {
      class CustomError extends Error {
        constructor(message: string) {
          super(message);
          this.name = 'CustomError';
        }
      }
      expect(isError(new CustomError('custom'))).toBe(true);
    });
  });

  describe('isObject', () => {
    it('should return true for plain object', () => {
      expect(isObject({})).toBe(true);
    });

    it('should return true for object with properties', () => {
      expect(isObject({ a: 1, b: 2 })).toBe(true);
    });

    it('should return true for object created with Object.create(null)', () => {
      expect(isObject(Object.create(null))).toBe(true);
    });

    it('should return false for null', () => {
      expect(isObject(null)).toBe(false);
    });

    it('should return false for array', () => {
      expect(isObject([1, 2, 3])).toBe(false);
    });

    it('should return false for empty array', () => {
      expect(isObject([])).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isObject(undefined)).toBe(false);
    });

    it('should return false for string', () => {
      expect(isObject('string')).toBe(false);
    });

    it('should return false for number', () => {
      expect(isObject(42)).toBe(false);
    });

    it('should return false for boolean', () => {
      expect(isObject(true)).toBe(false);
    });

    it('should return false for function', () => {
      expect(isObject(() => {})).toBe(false);
    });

    it('should return false for symbol', () => {
      expect(isObject(Symbol('test'))).toBe(false);
    });

    it('should return true for Date object', () => {
      // Date is still an object, not null, not an array
      expect(isObject(new Date())).toBe(true);
    });

    it('should return true for RegExp object', () => {
      expect(isObject(/test/)).toBe(true);
    });

    it('should return true for Map object', () => {
      expect(isObject(new Map())).toBe(true);
    });

    it('should return true for Set object', () => {
      expect(isObject(new Set())).toBe(true);
    });

    it('should return true for nested objects', () => {
      expect(isObject({ a: { b: { c: 1 } } })).toBe(true);
    });
  });

  describe('hasProperty', () => {
    it('should return true when object has the property', () => {
      expect(hasProperty({ name: 'test' }, 'name')).toBe(true);
    });

    it('should return true for property with undefined value', () => {
      expect(hasProperty({ key: undefined }, 'key')).toBe(true);
    });

    it('should return true for property with null value', () => {
      expect(hasProperty({ key: null }, 'key')).toBe(true);
    });

    it('should return true for property with falsy value', () => {
      expect(hasProperty({ count: 0 }, 'count')).toBe(true);
      expect(hasProperty({ empty: '' }, 'empty')).toBe(true);
      expect(hasProperty({ flag: false }, 'flag')).toBe(true);
    });

    it('should return false when object lacks the property', () => {
      expect(hasProperty({ name: 'test' }, 'age')).toBe(false);
    });

    it('should return false for null', () => {
      expect(hasProperty(null, 'key')).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(hasProperty(undefined, 'key')).toBe(false);
    });

    it('should return false for primitive string', () => {
      expect(hasProperty('string', 'length')).toBe(false);
    });

    it('should return false for primitive number', () => {
      expect(hasProperty(42, 'toString')).toBe(false);
    });

    it('should return false for array', () => {
      expect(hasProperty([1, 2, 3], '0')).toBe(false);
    });

    it('should return true for inherited properties', () => {
      const parent = { inherited: true };
      const child = Object.create(parent);
      expect(hasProperty(child, 'inherited')).toBe(true);
    });

    it('should work with symbol properties', () => {
      const sym = Symbol('test');
      // Note: hasProperty specifically checks for string keys
      // Symbol keys would need different handling
      expect(hasProperty({ [sym]: 'value' }, 'test')).toBe(false);
    });

    it('should return true for nested object with property', () => {
      expect(hasProperty({ outer: { inner: 1 } }, 'outer')).toBe(true);
    });
  });

  describe('isStringArray', () => {
    it('should return true for array of strings', () => {
      expect(isStringArray(['a', 'b', 'c'])).toBe(true);
    });

    it('should return true for empty array', () => {
      expect(isStringArray([])).toBe(true);
    });

    it('should return true for single string array', () => {
      expect(isStringArray(['single'])).toBe(true);
    });

    it('should return true for array with empty strings', () => {
      expect(isStringArray(['', '', ''])).toBe(true);
    });

    it('should return false for array with numbers', () => {
      expect(isStringArray([1, 2, 3])).toBe(false);
    });

    it('should return false for mixed array', () => {
      expect(isStringArray(['a', 1, 'b'])).toBe(false);
    });

    it('should return false for array with null', () => {
      expect(isStringArray(['a', null, 'b'])).toBe(false);
    });

    it('should return false for array with undefined', () => {
      expect(isStringArray(['a', undefined, 'b'])).toBe(false);
    });

    it('should return false for array with objects', () => {
      expect(isStringArray(['a', {}, 'b'])).toBe(false);
    });

    it('should return false for string', () => {
      expect(isStringArray('not an array')).toBe(false);
    });

    it('should return false for null', () => {
      expect(isStringArray(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isStringArray(undefined)).toBe(false);
    });

    it('should return false for object', () => {
      expect(isStringArray({ 0: 'a', 1: 'b', length: 2 })).toBe(false);
    });

    it('should return false for number', () => {
      expect(isStringArray(42)).toBe(false);
    });
  });

  describe('isNumberArray', () => {
    it('should return true for array of numbers', () => {
      expect(isNumberArray([1, 2, 3])).toBe(true);
    });

    it('should return true for empty array', () => {
      expect(isNumberArray([])).toBe(true);
    });

    it('should return true for single number array', () => {
      expect(isNumberArray([42])).toBe(true);
    });

    it('should return true for array with zero', () => {
      expect(isNumberArray([0, 0, 0])).toBe(true);
    });

    it('should return true for array with negative numbers', () => {
      expect(isNumberArray([-1, -2, -3])).toBe(true);
    });

    it('should return true for array with decimals', () => {
      expect(isNumberArray([1.5, 2.7, 3.14])).toBe(true);
    });

    it('should return true for array with Infinity', () => {
      expect(isNumberArray([Infinity, -Infinity])).toBe(true);
    });

    it('should return true for array with NaN', () => {
      // NaN is technically a number type
      expect(isNumberArray([NaN, 1, 2])).toBe(true);
    });

    it('should return false for array with strings', () => {
      expect(isNumberArray(['1', '2', '3'])).toBe(false);
    });

    it('should return false for mixed array', () => {
      expect(isNumberArray([1, 'a', 2])).toBe(false);
    });

    it('should return false for array with null', () => {
      expect(isNumberArray([1, null, 2])).toBe(false);
    });

    it('should return false for array with undefined', () => {
      expect(isNumberArray([1, undefined, 2])).toBe(false);
    });

    it('should return false for array with objects', () => {
      expect(isNumberArray([1, {}, 2])).toBe(false);
    });

    it('should return false for string', () => {
      expect(isNumberArray('123')).toBe(false);
    });

    it('should return false for null', () => {
      expect(isNumberArray(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isNumberArray(undefined)).toBe(false);
    });

    it('should return false for number', () => {
      expect(isNumberArray(42)).toBe(false);
    });
  });

  describe('getErrorMessage', () => {
    it('should return message from Error instance', () => {
      expect(getErrorMessage(new Error('test error'))).toBe('test error');
    });

    it('should return message from TypeError', () => {
      expect(getErrorMessage(new TypeError('type error'))).toBe('type error');
    });

    it('should return message from object with message property', () => {
      expect(getErrorMessage({ message: 'object error' })).toBe('object error');
    });

    it('should convert non-string message to string', () => {
      expect(getErrorMessage({ message: 123 })).toBe('123');
    });

    it('should handle null message property', () => {
      expect(getErrorMessage({ message: null })).toBe('null');
    });

    it('should handle undefined message property', () => {
      expect(getErrorMessage({ message: undefined })).toBe('undefined');
    });

    it('should return string error directly', () => {
      expect(getErrorMessage('string error')).toBe('string error');
    });

    it('should return empty string for empty string error', () => {
      expect(getErrorMessage('')).toBe('');
    });

    it('should return default message for null', () => {
      expect(getErrorMessage(null)).toBe('Unknown error occurred');
    });

    it('should return default message for undefined', () => {
      expect(getErrorMessage(undefined)).toBe('Unknown error occurred');
    });

    it('should return default message for number', () => {
      expect(getErrorMessage(404)).toBe('Unknown error occurred');
    });

    it('should return default message for boolean', () => {
      expect(getErrorMessage(false)).toBe('Unknown error occurred');
    });

    it('should return default message for empty object', () => {
      expect(getErrorMessage({})).toBe('Unknown error occurred');
    });

    it('should return default message for array', () => {
      expect(getErrorMessage(['error'])).toBe('Unknown error occurred');
    });

    it('should return default message for function', () => {
      expect(getErrorMessage(() => 'error')).toBe('Unknown error occurred');
    });

    it('should handle nested error object', () => {
      const error = new Error('outer');
      expect(getErrorMessage(error)).toBe('outer');
    });

    it('should prioritize Error instance over message property', () => {
      // Error.message is the actual message
      const error = new Error('actual message');
      expect(getErrorMessage(error)).toBe('actual message');
    });
  });

  describe('isFunction', () => {
    it('should return true for function declaration', () => {
      function testFn() {}
      expect(isFunction(testFn)).toBe(true);
    });

    it('should return true for arrow function', () => {
      expect(isFunction(() => {})).toBe(true);
    });

    it('should return true for function expression', () => {
      const fn = function() {};
      expect(isFunction(fn)).toBe(true);
    });

    it('should return true for async function', () => {
      async function asyncFn() {}
      expect(isFunction(asyncFn)).toBe(true);
    });

    it('should return true for async arrow function', () => {
      const asyncArrow = async () => {};
      expect(isFunction(asyncArrow)).toBe(true);
    });

    it('should return true for generator function', () => {
      function* genFn() {}
      expect(isFunction(genFn)).toBe(true);
    });

    it('should return true for class constructor', () => {
      class TestClass {}
      expect(isFunction(TestClass)).toBe(true);
    });

    it('should return true for built-in functions', () => {
      expect(isFunction(console.log)).toBe(true);
      expect(isFunction(parseInt)).toBe(true);
      expect(isFunction(Array.isArray)).toBe(true);
    });

    it('should return true for bound functions', () => {
      function fn() {}
      const boundFn = fn.bind(null);
      expect(isFunction(boundFn)).toBe(true);
    });

    it('should return false for null', () => {
      expect(isFunction(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isFunction(undefined)).toBe(false);
    });

    it('should return false for string', () => {
      expect(isFunction('function')).toBe(false);
    });

    it('should return false for number', () => {
      expect(isFunction(42)).toBe(false);
    });

    it('should return false for object', () => {
      expect(isFunction({})).toBe(false);
    });

    it('should return false for array', () => {
      expect(isFunction([])).toBe(false);
    });

    it('should return false for object with call property', () => {
      expect(isFunction({ call: () => {} })).toBe(false);
    });
  });

  describe('isPromise', () => {
    it('should return true for native Promise', () => {
      expect(isPromise(Promise.resolve())).toBe(true);
    });

    it('should return true for pending Promise', () => {
      expect(isPromise(new Promise(() => {}))).toBe(true);
    });

    it('should return true for rejected Promise', () => {
      const rejected = Promise.reject(new Error('test')).catch(() => {});
      expect(isPromise(rejected)).toBe(true);
    });

    it('should return true for Promise.all result', () => {
      expect(isPromise(Promise.all([]))).toBe(true);
    });

    it('should return true for Promise.race result', () => {
      expect(isPromise(Promise.race([Promise.resolve()]))).toBe(true);
    });

    it('should return true for async function result', () => {
      async function asyncFn() { return 1; }
      expect(isPromise(asyncFn())).toBe(true);
    });

    it('should return true for thenable object with then and catch', () => {
      const thenable = {
        then: () => {},
        catch: () => {},
      };
      expect(isPromise(thenable)).toBe(true);
    });

    it('should return false for null', () => {
      expect(isPromise(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isPromise(undefined)).toBe(false);
    });

    it('should return false for plain object', () => {
      expect(isPromise({})).toBe(false);
    });

    it('should return false for object with only then', () => {
      expect(isPromise({ then: () => {} })).toBe(false);
    });

    it('should return false for object with only catch', () => {
      expect(isPromise({ catch: () => {} })).toBe(false);
    });

    it('should return false for object with non-function then', () => {
      expect(isPromise({ then: 'not a function', catch: () => {} })).toBe(false);
    });

    it('should return false for object with non-function catch', () => {
      expect(isPromise({ then: () => {}, catch: 'not a function' })).toBe(false);
    });

    it('should return false for function', () => {
      expect(isPromise(() => {})).toBe(false);
    });

    it('should return false for array', () => {
      expect(isPromise([Promise.resolve()])).toBe(false);
    });

    it('should return false for string', () => {
      expect(isPromise('promise')).toBe(false);
    });

    it('should return false for number', () => {
      expect(isPromise(42)).toBe(false);
    });

    it('should return true for object that looks like a promise', () => {
      const fakePomise = {
        then: function() { return this; },
        catch: function() { return this; },
        finally: function() { return this; },
      };
      expect(isPromise(fakePomise)).toBe(true);
    });
  });
});
