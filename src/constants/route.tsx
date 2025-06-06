const ROUTE = {
  HOME: '/',
  SEARCH: '/products',
  PRODUCT: {
    DETAIL: '/product/:id',
  },
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    RESET_PASSWORD_REQUEST: '/request-password-reset',
    RESET_PASSWORD: '/reset-password',
    ACTIVATE_ACCOUNT: '/activate-account',
    CONFIRM_EMAIL: '/confirm-email',
    CHANGE_PASSWORD: '/change-password',
    AUTHENTICATE: '/authenticate',
  },
  CART: '/cart',
  CHECKOUT: '/checkout',
  CHAT: '/chat',
  POLICY: '/policy',
  BLOG: {
    LIST: '/blog',
    DETAIL: '/blog/:id',
  },
  PROFILE: '/profile',
  ORDER: {
    ROOT: '/orders',
    CONFIRMATION: '/order-confirmation',
  },
};

export default ROUTE;
