export const navbarLinks = [
  {
    label: 'products',
    path: '/search',
    authenticate: false, // No authentication required
  },
  {
    label: 'chat',
    path: '/chat',
    authenticate: true, // No authentication required
  },
  {
    label: 'policy',
    path: '/policy',
    authenticate: false, // No authentication required
  },
  {
    label: 'blog',
    path: '/blog',
    authenticate: false, // No authentication required
  },
  {
    label: 'orders',
    path: '/orders',
    authenticate: true, // Requires authentication
  },
]

export const shopName = 'ShopName'

export const navbarSearchPlaceholder = 'Search for products...'
