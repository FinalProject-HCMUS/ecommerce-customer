import { brands } from '../brands';

describe('brands data', () => {
  test('should export an array of brands', () => {
    expect(Array.isArray(brands)).toBe(true);
    expect(brands.length).toBeGreaterThan(0);
  });

  test('each brand should have name and logo properties', () => {
    brands.forEach((brand) => {
      expect(brand).toHaveProperty('name');
      expect(typeof brand.name).toBe('string');
      expect(brand).toHaveProperty('logo');
      expect(typeof brand.logo).toBe('string');
    });
  });

  test('should contain specific brands', () => {
    const brandNames = brands.map((b) => b.name);
    expect(brandNames).toEqual(
      expect.arrayContaining([
        'Versace',
        'Zara',
        'Gucci',
        'Prada',
        'Calvin Klein',
      ])
    );
  });

  test('should match snapshot', () => {
    expect(brands).toMatchSnapshot();
  });
});
