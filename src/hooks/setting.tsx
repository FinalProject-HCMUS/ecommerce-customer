import { useState, useCallback } from 'react';
import SettingsService from '../services/apis/setting';
import { SystemSettingResponse } from '../interfaces/config/setting';

export const useSystemSettings = (serviceName?: string) => {
  const [settings, setSettings] = useState<SystemSettingResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSettings = useCallback(
    async (serviceNameFilter?: string) => {
      setLoading(true);
      try {
        const response = await SettingsService.getAllSystemSettings(
          serviceNameFilter || serviceName
        );
        setSettings(response);
      } finally {
        setLoading(false);
      }
    },
    [serviceName]
  );

  return {
    settings,
    loading,
    fetchSettings,
  };
};

export default useSystemSettings;
