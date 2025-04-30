import enFlag from '../assets/images/flags/en.svg'
import viFlag from '../assets/images/flags/vi.svg'
// Translation files
import enTrans from '../locales/en/translation.json'
import viTrans from '../locales/vn/translation.json'

import { IRegion } from '../interfaces'

const RESOURCES = {
  vi: { translation: viTrans },
  en: { translation: enTrans },
}

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
}

export default {
  RESOURCES,
  REGIONS,
}
