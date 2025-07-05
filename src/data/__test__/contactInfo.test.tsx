import { contactInfo } from '../contactInfo';

describe('contactInfo', () => {
  test('should export an object', () => {
    expect(contactInfo).toBeDefined();
    expect(typeof contactInfo).toBe('object');
  });

  test('should have correct phone, email, and address', () => {
    expect(contactInfo).toHaveProperty('phone', '123-456-7890');
    expect(contactInfo).toHaveProperty('email', 'demo@gmail.com');
    expect(contactInfo).toHaveProperty(
      'address',
      '123 Dartmouth Street Boston, Massachusetts 02156 United States'
    );
  });

  test('should match snapshot', () => {
    expect(contactInfo).toMatchSnapshot();
  });
});