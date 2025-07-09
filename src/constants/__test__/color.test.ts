import colorData from '../color';

describe('colorData', () => {
  test('should export an object', () => {
    expect(colorData).toBeDefined();
    expect(typeof colorData).toBe('object');
  });

  test('should contain all expected color keys', () => {
    const expectedColors = [
      'purple',
      'yellow',
      'black',
      'white',
      'pink',
      'gray',
      'teal',
      'maroon',
      'navy',
      'turquoise',
      'lavender',
      'peach',
      'silver',
      'gold',
      'burgundy',
      'olive',
      'mustard',
      'mint',
      'coral',
      'taupe',
    ];

    expectedColors.forEach((color) => {
      expect(colorData).toHaveProperty(color);
    });

    // Verify we're not missing any colors or have extra ones
    expect(Object.keys(colorData).sort()).toEqual(expectedColors.sort());
  });

  test('should have valid hex color codes for all values', () => {
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    Object.values(colorData).forEach((colorCode) => {
      expect(colorCode).toMatch(hexColorRegex);
    });
  });

  test('should have correct hex values for specific colors', () => {
    expect(colorData.purple).toBe('#800080');
    expect(colorData.yellow).toBe('#FFFF00');
    expect(colorData.black).toBe('#000000');
    expect(colorData.white).toBe('#FFFFFF');
    expect(colorData.pink).toBe('#FFC0CB');
    expect(colorData.turquoise).toBe('#40E0D0');
    expect(colorData.gold).toBe('#FFD700');
  });

  test('should match snapshot', () => {
    expect(colorData).toMatchSnapshot();
  });
});
