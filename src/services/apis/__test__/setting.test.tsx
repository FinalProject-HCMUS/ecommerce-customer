import SettingsService from '../setting';
import client from '../request';

jest.mock('../request', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

const mockGet = client.get as jest.Mock;

describe('SettingsService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getAllSystemSettings should call client.get with correct url and params and return data', async () => {
    const mockSettings = [
      {
        id: '1',
        key: 'CurrencyCode',
        value: { code: 'VND' },
        serviceName: 'ecommerce',
      },
    ];
    mockGet.mockResolvedValueOnce({ data: mockSettings });

    const res = await SettingsService.getAllSystemSettings('ecommerce');
    expect(mockGet).toHaveBeenCalledWith('/system-settings', {
      params: { serviceName: 'ecommerce' },
    });
    expect(res).toEqual(mockSettings);
  });

  it('getAllSystemSettings should call client.get without params if serviceName is not provided', async () => {
    const mockSettings = [
      {
        id: '2',
        key: 'MaxPriceFilter',
        value: { max: 5000000 },
        serviceName: 'ecommerce',
      },
    ];
    mockGet.mockResolvedValueOnce({ data: mockSettings });

    const res = await SettingsService.getAllSystemSettings();
    expect(mockGet).toHaveBeenCalledWith('/system-settings', { params: {} });
    expect(res).toEqual(mockSettings);
  });

  it('getAllServiceNames should call client.get with correct url and return data', async () => {
    const mockServiceNames = ['ecommerce', 'payment'];
    mockGet.mockResolvedValueOnce({ data: mockServiceNames });

    const res = await SettingsService.getAllServiceNames();
    expect(mockGet).toHaveBeenCalledWith('/system-settings/service-names');
    expect(res).toEqual(mockServiceNames);
  });
});
