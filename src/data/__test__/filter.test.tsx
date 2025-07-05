import { categories, colors, sizes } from '../filter';

describe('filter data', () => {
  test('categories should be an array with correct items', () => {
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
    categories.forEach(cat => {
      expect(cat).toHaveProperty('id');
      expect(cat).toHaveProperty('label');
      expect(typeof cat.id).toBe('string');
      expect(typeof cat.label).toBe('string');
    });
    expect(categories.map(c => c.id)).toEqual(
      expect.arrayContaining(['tshirts', 'shorts', 'shirts', 'hoodies', 'jeans'])
    );
  });

  test('colors should be an array with correct items', () => {
    expect(Array.isArray(colors)).toBe(true);
    expect(colors.length).toBeGreaterThan(0);
    colors.forEach(color => {
      expect(color).toHaveProperty('id');
      expect(color).toHaveProperty('color');
      expect(typeof color.id).toBe('string');
      expect(typeof color.color).toBe('string');
    });
    // Check for a color with border property
    expect(colors.find(c => c.id === 'white')).toHaveProperty('border', true);
  });

  test('sizes should be an array with correct items', () => {
    expect(Array.isArray(sizes)).toBe(true);
    expect(sizes.length).toBeGreaterThan(0);
    sizes.forEach(size => {
      expect(size).toHaveProperty('id');
      expect(size).toHaveProperty('label');
      expect(typeof size.id).toBe('string');
      expect(typeof size.label).toBe('string');
    });
    expect(sizes.map(s => s.id)).toEqual(
      expect.arrayContaining(['xxs', 'xs', 'small', 'medium', 'large', 'xl', 'xxl', '3xl', '4xl'])
    );
  });

  test('should match snapshot', () => {
    expect({ categories, colors, sizes }).toMatchSnapshot();
  });
});