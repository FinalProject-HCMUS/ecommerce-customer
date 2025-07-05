import { render, screen, waitFor } from '@testing-library/react';
import { SettingsProvider, useSettingsContext } from '../settingContext';
import settingService from '../../services/apis/setting';

// Mock the SettingsService
jest.mock('../../services/apis/setting', () => ({
  __esModule: true,
  default: {
    getAllSystemSettings: jest.fn(),
  },
}));

const mockSettings = [
  { id: '1', key: 'CurrencyCode', value: 'VND', serviceName: 'ecommerce' },
  { id: '2', key: 'MaxPriceFilter', value: 5000000, serviceName: 'ecommerce' },
];

function TestComponent() {
  const { settings, loading, error, refreshSettings } = useSettingsContext();
  return (
    <div>
      <div data-testid="loading">{loading ? 'loading' : 'loaded'}</div>
      <div data-testid="error">{error}</div>
      <div data-testid="settings">{JSON.stringify(settings)}</div>
      <button onClick={refreshSettings}>Refresh</button>
    </div>
  );
}
const getAllSystemSettings = settingService.getAllSystemSettings as jest.Mock;

describe('SettingsProvider and useSettingsContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('provides settings after successful fetch', async () => {
    getAllSystemSettings.mockResolvedValueOnce(mockSettings);

    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('loading');
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded')
    );
    expect(screen.getByTestId('settings')).toHaveTextContent(
      JSON.stringify(mockSettings)
    );
    expect(screen.getByTestId('error')).toHaveTextContent('');
  });

  test('handles fetch error', async () => {
    getAllSystemSettings.mockRejectedValueOnce(new Error('Network error'));

    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded')
    );
    expect(screen.getByTestId('settings')).toHaveTextContent('[]');
    expect(screen.getByTestId('error')).toHaveTextContent(
      'Failed to load system settings'
    );
  });

  test('refreshSettings fetches settings again', async () => {
    getAllSystemSettings.mockResolvedValueOnce(mockSettings);
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded')
    );

    // Change mock for refresh
    const newSettings = [
      { id: '3', key: 'NewSetting', value: '123', serviceName: 'ecommerce' },
    ];
    getAllSystemSettings.mockResolvedValueOnce(newSettings);

    screen.getByText('Refresh').click();
    await waitFor(() =>
      expect(screen.getByTestId('settings')).toHaveTextContent(
        JSON.stringify(newSettings)
      )
    );
  });

  test('throws error if useSettingsContext is used outside provider', () => {
    // Suppress error output for this test
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    function BadComponent() {
      useSettingsContext();
      return null;
    }
    expect(() => render(<BadComponent />)).toThrow(
      'useSettingsContext must be used within a SettingsProvider'
    );
    spy.mockRestore();
  });
});
