import { IRoute } from '../interfaces/common';
import { lazy } from 'react';
import { withAssignedVersions } from '../hocs/withAssignedVersion';
import FLAG_KEYS from '../constants/flagsup';

const HomePage = lazy(() => import('../page/home/home-page'));
const SearchPage = lazy(() => import('../page/search/search-page'));
const LoginPage = lazy(() => import('../page/auth/login-page'));
const RegistrationPage = lazy(() => import('../page/auth/registration-page'));
const DetailProduct = lazy(() => import('../page/detail-product/detail-product-page'));
const CartPage = lazy(() => import('../page/cart/cart-page'));
const CheckoutPage = lazy(() => import('../page/checkout/checkout-page'));
const Chat = lazy(() => import('../page/chat/chat'));
const Policy = lazy(() => import('../page/policy/policy'));
const BlogPage = lazy(() => import('../page/blog/blog-page'));
const DetailBlogPage = lazy(() => import('../page/blog/detail-blog-page'));
const Page403 = lazy(() => import('../page/error/Page403'));
const Page500 = lazy(() => import('../page/error/Page500'));

const routes: IRoute[] = [
  {
    exact: true,
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    exact: true,
    path: '/search',
    name: 'Search',
    component: SearchPage,
  },
  {
    exact: true,
    path: '/login',
    name: 'Login',
    component: withAssignedVersions(LoginPage, FLAG_KEYS.LOGIN),
  },
  {
    exact: true,
    path: '/register',
    name: 'Register',
    component: withAssignedVersions(RegistrationPage, FLAG_KEYS.REGISTRATION),
  },
  {
    exact: true,
    path: '/product/:id',
    name: 'Detail Product',
    component: DetailProduct,
  },
  {
    exact: true,
    path: '/cart',
    name: 'Cart Page',
    component: withAssignedVersions(CartPage, FLAG_KEYS.CART),
  },
  {
    exact: true,
    path: '/checkout',
    name: 'Checkout Page',
    component: withAssignedVersions(CheckoutPage, FLAG_KEYS.CHECKOUT),
  },
  {
    exact: true,
    path: '/chat',
    name: 'Chat Pages',
    component: withAssignedVersions(Chat, FLAG_KEYS.CHAT),
  },
  {
    exact: true,
    path: '/policy',
    name: 'Policy Page',
    component: withAssignedVersions(Policy, FLAG_KEYS.POLICY),
  },
  {
    exact: true,
    path: '/blog',
    name: 'Blog Page',
    component: withAssignedVersions(BlogPage, FLAG_KEYS.BLOG),
  },
  {
    exact: true,
    path: '/blog/:id',
    name: 'Detail Blog Page',
    component: withAssignedVersions(DetailBlogPage, FLAG_KEYS.BLOG),
  },
  {
    exact: true,
    path: '/403',
    name: 'Page 403',
    component: Page403,
  },
  {
    exact: true,
    path: '/500',
    name: 'Page 500',
    component: Page500,
  },
];

export default routes;
