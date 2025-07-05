import { statusConfig } from '../statusConfig';
import { Status } from '../../interfaces/order/Status';

describe('statusConfig', () => {
  test('should export an object with all Status keys', () => {
    expect(typeof statusConfig).toBe('object');
    const expectedStatuses = [
      Status.NEW,
      Status.CANCELLED,
      Status.PROCESSING,
      Status.PACKAGED,
      Status.PICKED,
      Status.SHIPPING,
      Status.DELIVERED,
      Status.REFUNDED,
    ];
    expectedStatuses.forEach(status => {
      expect(statusConfig).toHaveProperty(status);
    });
  });

  test('each status config should have correct structure', () => {
    Object.values(statusConfig).forEach(cfg => {
      expect(cfg).toHaveProperty('icon');
      expect(cfg).toHaveProperty('color');
      expect(cfg).toHaveProperty('bgColor');
      expect(cfg).toHaveProperty('borderColor');
      expect(cfg).toHaveProperty('text');
      expect(typeof cfg.color).toBe('string');
      expect(typeof cfg.bgColor).toBe('string');
      expect(typeof cfg.borderColor).toBe('string');
      expect(typeof cfg.text).toBe('string');
    });
  });

  test('should have correct text for each status', () => {
    expect(statusConfig[Status.NEW].text).toBe('New');
    expect(statusConfig[Status.CANCELLED].text).toBe('Cancelled');
    expect(statusConfig[Status.PROCESSING].text).toBe('Processing');
    expect(statusConfig[Status.PACKAGED].text).toBe('Packaged');
    expect(statusConfig[Status.PICKED].text).toBe('Picked');
    expect(statusConfig[Status.SHIPPING].text).toBe('Shipping');
    expect(statusConfig[Status.DELIVERED].text).toBe('Delivered');
    expect(statusConfig[Status.REFUNDED].text).toBe('Refunded');
  });

  test('should match snapshot', () => {
    expect(statusConfig).toMatchSnapshot();
  });
});