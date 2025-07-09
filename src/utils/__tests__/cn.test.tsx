import { cn } from '../cn';

describe('cn utility', () => {
  it('should combine multiple class strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should handle arrays of classes', () => {
    expect(cn('foo', ['bar', 'baz'])).toBe('foo bar baz');
  });

  it('should merge Tailwind classes properly', () => {
    // Should keep the last conflicting class (text-red-500)
    expect(cn('text-blue-500', 'text-red-500')).toBe('text-red-500');

    // Should combine non-conflicting classes
    expect(cn('px-4 py-2', 'rounded-md')).toBe('px-4 py-2 rounded-md');

    // Should handle more complex conflicts
    expect(cn('p-4', 'px-6')).toBe('p-4 px-6');
    expect(cn('p-4 text-red-500', 'text-blue-500')).toBe('p-4 text-blue-500');
  });
});
