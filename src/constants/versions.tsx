import FLAG_KEYS from './flagsup';
const VERSIONS = [
  {
    name: 'version_1',
    keys: [],
  },
  {
    name: 'version_2',
    keys: [
      FLAG_KEYS.VIRTUAL_TRY_ON,
      FLAG_KEYS.LOGIN,
      FLAG_KEYS.REGISTRATION,
      FLAG_KEYS.CART,
      FLAG_KEYS.TRACK_ORDER,
      FLAG_KEYS.POLICY,
      FLAG_KEYS.CHECKOUT,
    ],
  },
  {
    name: 'version_3',
    keys: [
      FLAG_KEYS.VIRTUAL_TRY_ON,
      FLAG_KEYS.LOGIN,
      FLAG_KEYS.REGISTRATION,
      FLAG_KEYS.CART,
      FLAG_KEYS.TRACK_ORDER,
      FLAG_KEYS.CHECKOUT,
      FLAG_KEYS.RATING,
      FLAG_KEYS.CHAT,
      FLAG_KEYS.POLICY,
      FLAG_KEYS.BLOG,
      FLAG_KEYS.NATURAL_QUERY,
    ],
  },
];

const CURRENT_VERSION = 'version_3';

export default {
  VERSIONS,
  CURRENT_VERSION,
};
