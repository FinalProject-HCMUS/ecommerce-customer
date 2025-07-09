import { renderHook, act } from '@testing-library/react';
import SettingsService from '../../services/apis/setting';
import { useSystemSettings } from '../setting';

jest.mock('../../services/apis/setting', () => ({
  __esModule: true,
  default: {
    getAllSystemSettings: jest.fn(),
    getAllServiceNames: jest.fn(),
  },
}));

describe('useSystemSettings', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchSettings should call getAllSystemSettings and update settings', async () => {
    const mockSettings = [
      {
        id: '1',
        key: 'theme',
        value: { color: 'blue' },
        serviceName: 'shop',
      },
    ];
    (SettingsService.getAllSystemSettings as jest.Mock).mockResolvedValueOnce(
      mockSettings
    );

    const { result } = renderHook(() => useSystemSettings('shop'));
    await act(async () => {
      await result.current.fetchSettings();
    });

    expect(SettingsService.getAllSystemSettings).toHaveBeenCalledWith('shop');
    expect(result.current.settings).toEqual(mockSettings);
    expect(result.current.loading).toBe(false);
  });

  it('fetchSettings should use filter argument if provided', async () => {
    const mockSettings = [
      {
        id: '2',
        key: 'lang',
        value: { locale: 'en' },
        serviceName: 'admin',
      },
    ];
    (SettingsService.getAllSystemSettings as jest.Mock).mockResolvedValueOnce(
      mockSettings
    );

    const { result } = renderHook(() => useSystemSettings('shop'));
    await act(async () => {
      await result.current.fetchSettings('admin');
    });

    expect(SettingsService.getAllSystemSettings).toHaveBeenCalledWith('admin');
    expect(result.current.settings).toEqual(mockSettings);
    expect(result.current.loading).toBe(false);
  });
});
