import { problems } from '@/lib/problems';

/**
 * Test to ensure all problem IDs are unique
 * Prevents React key duplication errors
 */
describe('Problem IDs Uniqueness', () => {
  it('should have unique IDs for all problems', () => {
    const ids = problems.map(p => p.id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    const uniqueDuplicates = [...new Set(duplicates)];
    
    if (uniqueDuplicates.length > 0) {
      console.error('Duplicate problem IDs found:', uniqueDuplicates);
      uniqueDuplicates.forEach(dupId => {
        const problemsWithId = problems.filter(p => p.id === dupId);
        console.error(`  ID "${dupId}" is used by:`, problemsWithId.map(p => p.title));
      });
    }
    
    expect(uniqueDuplicates.length).toBe(0);
  });

  it('should have non-empty IDs for all problems', () => {
    problems.forEach(problem => {
      expect(problem.id).toBeDefined();
      expect(typeof problem.id).toBe('string');
      expect(problem.id.trim().length).toBeGreaterThan(0);
    });
  });

  it('should have IDs that match kebab-case format', () => {
    problems.forEach(problem => {
      // IDs should be lowercase and use hyphens, not underscores or spaces
      expect(problem.id).toMatch(/^[a-z0-9-]+$/);
    });
  });
});
