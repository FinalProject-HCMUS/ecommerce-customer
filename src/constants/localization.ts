import enFlag from '../assets/images/flags/en.svg';
import viFlag from '../assets/images/flags/vi.svg';
// Translation files
import enTrans from '../locales/en/translation.json';
import viTrans from '../locales/vn/translation.json';
import enShopData from '../locales/en/shopData.json';
import viShopData from '../locales/vn/shopData.json';
import enUserMessage from '../locales/en/userMessage.json';
import vnUserMessage from '../locales/vn/userMessage.json';
import enVton from '../locales/en/vton.json';
import vnVton from '../locales/vn/vton.json';

import { IRegion } from '../interfaces';

const RESOURCES = {
  vi: { translation: { ...viTrans, ...viShopData, ...vnUserMessage, ...vnVton } },
  en: { translation: { ...enTrans, ...enShopData, ...enUserMessage, ...enVton } },
};

const REGIONS: IRegion = {
  vi: {
    key: 'vi',
    name: 'Tiếng Việt',
    flag: viFlag,
  },
  en: {
    key: 'en',
    name: 'English',
    flag: enFlag,
  },
};

const VN = 'vn-VN';
const EN = 'en-US';

export default {
  RESOURCES,
  REGIONS,
  VN,
  EN,
};