import client from './request';
import { SystemSettingResponse } from '../../interfaces/config/setting';

export const SettingsService = {
  getAllSystemSettings: async (
    serviceName?: string
  ): Promise<SystemSettingResponse[]> => {
    const params = serviceName ? { serviceName } : {};
    const response = await client.get('/system-settings', { params });
    return response.data;
  },

  getAllServiceNames: async (): Promise<string[]> => {
    const response = await client.get('/system-settings/service-names');
    return response.data;
  },
};

export default SettingsService;
