/**
 * Tests for the deepEqual function in test-runner.ts
 *
 * Since deepEqual is not exported, we re-implement the same logic here
 * to test the equality behavior independently.
 */

// Re-implementation of deepEqual for testing (matches lib/test-runner.ts implementation)
function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;

  if (a == null || b == null) return false;

  if (typeof a !== typeof b) return false;

  if (typeof a !== 'object') {
    // Handle NaN
    if (Number.isNaN(a) && Number.isNaN(b)) return true;
    return a === b;
  }

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  const keysA = Object.keys(a as Record<string, unknown>);
  const keysB = Object.keys(b as Record<string, unknown>);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    if (!deepEqual(aObj[key], bObj[key])) return false;
  }

  return true;
}

describe('deepEqual', () => {
  describe('primitive equality', () => {
    it('should return true for equal numbers', () => {
      expect(deepEqual(1, 1)).toBe(true);
      expect(deepEqual(0, 0)).toBe(true);
      expect(deepEqual(-1, -1)).toBe(true);
      expect(deepEqual(3.14, 3.14)).toBe(true);
    });

    it('should return false for different numbers', () => {
      expect(deepEqual(1, 2)).toBe(false);
      expect(deepEqual(0, 1)).toBe(false);
      expect(deepEqual(-1, 1)).toBe(false);
      expect(deepEqual(3.14, 3.15)).toBe(false);
    });

    it('should return true for equal strings', () => {
      expect(deepEqual('hello', 'hello')).toBe(true);
      expect(deepEqual('', '')).toBe(true);
      expect(deepEqual('test', 'test')).toBe(true);
    });

    it('should return false for different strings', () => {
      expect(deepEqual('hello', 'world')).toBe(false);
      expect(deepEqual('', ' ')).toBe(false);
      expect(deepEqual('test', 'Test')).toBe(false);
    });

    it('should return true for equal booleans', () => {
      expect(deepEqual(true, true)).toBe(true);
      expect(deepEqual(false, false)).toBe(true);
    });

    it('should return false for different booleans', () => {
      expect(deepEqual(true, false)).toBe(false);
      expect(deepEqual(false, true)).toBe(false);
    });
  });

  describe('NaN equality', () => {
    it('should return true when both values are NaN', () => {
      expect(deepEqual(NaN, NaN)).toBe(true);
    });

    it('should return false when only one value is NaN', () => {
      expect(deepEqual(NaN, 1)).toBe(false);
      expect(deepEqual(1, NaN)).toBe(false);
      expect(deepEqual(NaN, 0)).toBe(false);
    });

    it('should handle NaN in arrays', () => {
      expect(deepEqual([NaN], [NaN])).toBe(true);
      expect(deepEqual([1, NaN, 3], [1, NaN, 3])).toBe(true);
      expect(deepEqual([NaN], [1])).toBe(false);
    });

    it('should handle NaN in objects', () => {
      expect(deepEqual({ a: NaN }, { a: NaN })).toBe(true);
      expect(deepEqual({ a: NaN }, { a: 1 })).toBe(false);
    });
  });

  describe('null and undefined handling', () => {
    it('should return true for null === null', () => {
      expect(deepEqual(null, null)).toBe(true);
    });

    it('should return true for undefined === undefined', () => {
      expect(deepEqual(undefined, undefined)).toBe(true);
    });

    it('should return false for null vs undefined', () => {
      expect(deepEqual(null, undefined)).toBe(false);
      expect(deepEqual(undefined, null)).toBe(false);
    });

    it('should return false for null vs other values', () => {
      expect(deepEqual(null, 0)).toBe(false);
      expect(deepEqual(null, '')).toBe(false);
      expect(deepEqual(null, false)).toBe(false);
      expect(deepEqual(null, [])).toBe(false);
      expect(deepEqual(null, {})).toBe(false);
    });

    it('should return false for undefined vs other values', () => {
      expect(deepEqual(undefined, 0)).toBe(false);
      expect(deepEqual(undefined, '')).toBe(false);
      expect(deepEqual(undefined, false)).toBe(false);
      expect(deepEqual(undefined, [])).toBe(false);
      expect(deepEqual(undefined, {})).toBe(false);
    });
  });

  describe('array comparison', () => {
    it('should return true for empty arrays', () => {
      expect(deepEqual([], [])).toBe(true);
    });

    it('should return true for arrays with same elements', () => {
      expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(deepEqual(['a', 'b', 'c'], ['a', 'b', 'c'])).toBe(true);
      expect(deepEqual([true, false], [true, false])).toBe(true);
    });

    it('should return false for arrays with different lengths', () => {
      expect(deepEqual([1, 2, 3], [1, 2])).toBe(false);
      expect(deepEqual([1], [1, 2, 3])).toBe(false);
      expect(deepEqual([], [1])).toBe(false);
    });

    it('should return false for arrays with different elements', () => {
      expect(deepEqual([1, 2, 3], [1, 2, 4])).toBe(false);
      expect(deepEqual([1, 2, 3], [3, 2, 1])).toBe(false);
    });

    it('should handle nested arrays', () => {
      expect(
        deepEqual(
          [
            [1, 2],
            [3, 4],
          ],
          [
            [1, 2],
            [3, 4],
          ]
        )
      ).toBe(true);
      expect(
        deepEqual(
          [
            [1, 2],
            [3, 4],
          ],
          [
            [1, 2],
            [3, 5],
          ]
        )
      ).toBe(false);
      expect(deepEqual([[[1]]], [[[1]]])).toBe(true);
      expect(deepEqual([[[1]]], [[[2]]])).toBe(false);
    });

    it('should handle arrays with mixed types', () => {
      expect(deepEqual([1, 'a', true], [1, 'a', true])).toBe(true);
      expect(deepEqual([1, 'a', true], [1, 'a', false])).toBe(false);
    });
  });

  describe('object comparison', () => {
    it('should return true for empty objects', () => {
      expect(deepEqual({}, {})).toBe(true);
    });

    it('should return true for objects with same keys and values', () => {
      expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true);
      expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
      expect(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    });

    it('should return false for objects with different keys', () => {
      expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false);
      expect(deepEqual({ a: 1, b: 2 }, { a: 1, c: 2 })).toBe(false);
    });

    it('should return false for objects with different number of keys', () => {
      expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
      expect(deepEqual({ a: 1, b: 2, c: 3 }, { a: 1 })).toBe(false);
    });

    it('should return false for objects with same keys but different values', () => {
      expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
      expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    });

    it('should handle nested objects', () => {
      expect(deepEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
      expect(deepEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
      expect(deepEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })).toBe(true);
      expect(deepEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } })).toBe(false);
    });

    it('should handle objects with array values', () => {
      expect(deepEqual({ a: [1, 2, 3] }, { a: [1, 2, 3] })).toBe(true);
      expect(deepEqual({ a: [1, 2, 3] }, { a: [1, 2, 4] })).toBe(false);
    });
  });

  describe('mixed types (array vs object)', () => {
    it('should return false for array vs object', () => {
      expect(deepEqual([], {})).toBe(false);
      expect(deepEqual({}, [])).toBe(false);
    });

    it('should return false for array vs object with same content representation', () => {
      expect(deepEqual([1, 2, 3], { 0: 1, 1: 2, 2: 3 })).toBe(false);
      expect(deepEqual({ 0: 1, 1: 2, 2: 3 }, [1, 2, 3])).toBe(false);
    });

    it('should handle nested mixed types correctly', () => {
      expect(deepEqual({ a: [1, 2] }, { a: [1, 2] })).toBe(true);
      expect(deepEqual([{ a: 1 }], [{ a: 1 }])).toBe(true);
      expect(deepEqual({ a: [1, 2] }, { a: { 0: 1, 1: 2 } })).toBe(false);
    });
  });

  describe('type mismatches', () => {
    it('should return false for number vs string', () => {
      expect(deepEqual(1, '1')).toBe(false);
      expect(deepEqual(0, '0')).toBe(false);
      expect(deepEqual(0, '')).toBe(false);
    });

    it('should return false for number vs boolean', () => {
      expect(deepEqual(1, true)).toBe(false);
      expect(deepEqual(0, false)).toBe(false);
    });

    it('should return false for string vs boolean', () => {
      expect(deepEqual('true', true)).toBe(false);
      expect(deepEqual('false', false)).toBe(false);
      expect(deepEqual('', false)).toBe(false);
    });

    it('should return false for primitive vs object', () => {
      expect(deepEqual(1, { value: 1 })).toBe(false);
      expect(deepEqual('test', { value: 'test' })).toBe(false);
      expect(deepEqual(true, { value: true })).toBe(false);
    });

    it('should return false for primitive vs array', () => {
      expect(deepEqual(1, [1])).toBe(false);
      expect(deepEqual('test', ['test'])).toBe(false);
      expect(deepEqual(true, [true])).toBe(false);
    });
  });
});
