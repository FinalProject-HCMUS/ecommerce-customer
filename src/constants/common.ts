const orderStatus = [
  { value: 'all', label: 'All Orders' },
  { value: 'NEW', label: 'New' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'PACKAGED', label: 'Packaged' },
  { value: 'PICKED', label: 'Picked' },
  { value: 'SHIPPING', label: 'Shipping' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'REFUNDED', label: 'Refunded' },
];

const TOP_PRODUCTS_PER_PAGE = 30;
const PRODUCT_PER_PAGE = 16;
const BLOG_PER_PAGE = 10;
const TOP_TRENDING = 'TOP TRENDING';
const TOP_SELLING = 'TOP SELLING';
const VISIBLE_PRODUCT = 4;

const COLOR_PER_PAGE = 100;
const SIZE_PER_PAGE = 10;
const CATEGORY_PER_PAGE = 10;

const TIME_OUT_ADD_TO_CART = 2000;
const DESCREASE = 'decrease';
const INCREASE = 'increase';

const PAYMENT_METHOD = [
  { id: 'cod', label: 'COD' },
  { id: 'vnpay', label: 'VNpay' },
];

export {
  orderStatus,
  TOP_PRODUCTS_PER_PAGE,
  PRODUCT_PER_PAGE,
  BLOG_PER_PAGE,
  TOP_SELLING,
  TOP_TRENDING,
  VISIBLE_PRODUCT,
  COLOR_PER_PAGE,
  SIZE_PER_PAGE,
  CATEGORY_PER_PAGE,
  TIME_OUT_ADD_TO_CART,
  DESCREASE,
  INCREASE,
  PAYMENT_METHOD,
};
