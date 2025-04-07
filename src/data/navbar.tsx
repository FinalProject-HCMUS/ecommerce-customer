import FLAG_KEYS from '../constants/flagsup';
import versions from '../constants/versions';

export const navbarLinks = [
  {
    label: 'Products',
    path: '/search',
    key: null,
  },
  {
    label: 'Chat',
    path: '/chat',
    key: FLAG_KEYS.CHAT,
  },
  {
    label: 'Policy',
    path: '/policy',
    key: FLAG_KEYS.POLICY,
  },
  {
    label: 'Blog',
    path: '/blog',
    key: FLAG_KEYS.BLOG,
  },
];

export const shopName = 'ShopName';

export const navbarSearchPlaceholder = 'Search for products...';

export const getFilteredNavbarLinks = () => {
  const { VERSIONS, CURRENT_VERSION } = versions;

  // Find the current version object
  const currentVersion = VERSIONS.find((version) => version.name === CURRENT_VERSION);

  // Filter navbarLinks based on the keys in the current version
  return navbarLinks.filter((link) => {
    // If the link has no key, it is always included
    if (!link.key) return true;

    // Include the link if its key exists in the current version's keys
    return currentVersion?.keys.includes(link.key);
  });
};
