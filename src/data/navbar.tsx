export const navbarLinks = [
  {
    label: 'Products',
    path: '/search',
    authenticate: false, // No authentication required
  },
  {
    label: 'Chat',
    path: '/chat',
    authenticate: true, // No authentication required
  },
  {
    label: 'Policy',
    path: '/policy',
    authenticate: false, // No authentication required
  },
  {
    label: 'Blog',
    path: '/blog',
    authenticate: false, // No authentication required
  },
  {
    label: 'Orders',
    path: '/orders',
    authenticate: true, // Requires authentication
  },
]

export const shopName = 'ShopName'

export const navbarSearchPlaceholder = 'Search for products...'
