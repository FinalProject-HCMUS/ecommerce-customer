import { navbarLinks, shopName, navbarSearchPlaceholder } from '../navbar';

describe('navbar data', () => {
  test('navbarLinks should be an array with correct structure', () => {
    expect(Array.isArray(navbarLinks)).toBe(true);
    expect(navbarLinks.length).toBeGreaterThan(0);

    navbarLinks.forEach(link => {
      expect(link).toHaveProperty('label');
      expect(typeof link.label).toBe('string');
      expect(link).toHaveProperty('path');
      expect(typeof link.path).toBe('string');
      expect(link).toHaveProperty('authenticate');
      expect(typeof link.authenticate).toBe('boolean');
    });

    // Check for some expected links
    expect(navbarLinks.map(l => l.label)).toEqual(
      expect.arrayContaining(['products', 'chat', 'policy', 'blog', 'orders'])
    );
  });

  test('shopName should be a string', () => {
    expect(typeof shopName).toBe('string');
    expect(shopName).toBe('ShopName');
  });

  test('navbarSearchPlaceholder should be a string', () => {
    expect(typeof navbarSearchPlaceholder).toBe('string');
    expect(navbarSearchPlaceholder).toBe('Search for products...');
  });

  test('should match snapshot', () => {
    expect({ navbarLinks, shopName, navbarSearchPlaceholder }).toMatchSnapshot();
  });
});